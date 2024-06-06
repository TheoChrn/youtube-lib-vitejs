import useAddVideo from "@/hooks/useAddVideo";
import UseRetrieveUserData from "@/hooks/useGetUserDataFromCache";
import { checkEmptyValues } from "@/lib/utils";
import { Video } from "@/types/types";
import React from "react";
import { Button } from "../ui/button";
import YoutubeMiniatureCardWithEditionWrapper from "./youtubeMiniatureCard/youtubeMiniatureCardWithEditionWrapper";
import { NavLink } from "../ui/navlink";
import { ArrowLeft } from "lucide-react";

export interface FavoriteSectionProps {
  setIsSearching: (value: React.SetStateAction<boolean>) => void;
  setCurrentVideo: (value: React.SetStateAction<Video>) => void;
}

const FavoritesSection = (props: FavoriteSectionProps) => {
  const addVideoMutation = useAddVideo();
  const user = UseRetrieveUserData();

  /**
   * On drop, parses the value from dataTransfer to retieve the new video object.
   * Checks if empty values otherwise add the video to favorites
   * @param e React DragEvent
   * @returns void
   */
  const handleOnDrop = (e: React.DragEvent) => {
    const newVideo: Video = JSON.parse(e.dataTransfer.getData("newVideo"));

    if (checkEmptyValues(newVideo)) return;
    addVideoMutation.mutate({ userName: user.name, newVideo });
  };

  return (
    <section
      onDrop={(e) => handleOnDrop(e)}
      onDragOver={(e) => e.preventDefault()}
      className="grid grid-row-3 gap-y-6 h-auto items-center lg:flex lg:flex-col overflow-auto lg:pr-6 lg:flex-auto"
    >
      <h3 className="w-full text-center text-3xl">
        Favoris de{" "}
        <span className="text-accent first-letter:uppercase">
          <span className="">{user.name}</span>
        </span>
      </h3>
      <div className="flex items-center gap-6">
        <NavLink
          variant={"youtube"}
          size={"youtube"}
          className="px-8 flex items-center gap-5 text-sm"
          to="/"
        >
          <ArrowLeft /> Back
        </NavLink>
        <Button
          variant={"youtube"}
          size={"youtube"}
          onClick={() => props.setIsSearching(true)}
          className="w-fit justify-self-center"
        >
          Add+ new video
        </Button>
      </div>
      {user.videos.length > 0 ? (
        <YoutubeMiniatureCardWithEditionWrapper
          userVideos={user.videos}
          setCurrentVideo={props.setCurrentVideo}
          setIsSearching={props.setIsSearching}
        />
      ) : (
        <div>No videos in favorites</div>
      )}
    </section>
  );
};

export default FavoritesSection;
