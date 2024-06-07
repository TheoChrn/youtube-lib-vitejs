import FavoritesSection from "@/components/favorites/favoritesSection";
import SearchSection from "@/components/search/searchSection";
import EmbedYoutubeVideo from "@/components/youtubeEmbed/EmbedYoutubeVideo";
import { userDataQuery, userLoader } from "@/loaders/loaders";
import { User, Video } from "@/types/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Toaster } from "sonner";

const UserPage = () => {
  const { userName } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof userLoader>>
  >;

  const { data: user } = useSuspenseQuery(userDataQuery(userName)) as {
    data: User;
  };

  const [isSearching, setIsSearching] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(
    user.videos[0] ?? null
  );

  useEffect(() => {
    setCurrentVideo(user.videos[0]);

    return () => {
      setCurrentVideo(null);
    };
  }, [user]);

  return (
    <main className="relative flex flex-col p-5 items-center justify-center max-w-screen-2xl mx-auto">
      <Toaster
        toastOptions={{
          className: "bg-white text-accent shadow-[0px_5px_0_0] shadow-accent",
        }}
      />

      <div className="flex flex-col lg:flex-row w-full  h-full mt-16 lg:h-[70svh] gap-y-16">
        <FavoritesSection
          setIsSearching={setIsSearching}
          setCurrentVideo={setCurrentVideo}
        />

        <section className="lg:flex-[0_0_70%] h-full lg:pl-6">
          {isSearching ? (
            <SearchSection />
          ) : (
            <>
              {currentVideo ? (
                <EmbedYoutubeVideo currentVideo={currentVideo} />
              ) : (
                <div>Please select a video to watch.</div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default UserPage;
