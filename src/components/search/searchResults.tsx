import { YoutubeResult } from "@/types/types";
import { UseMutationResult } from "@tanstack/react-query";
import YoutubeMiniatureAddToFav from "../favorites/youtubeMiniatureCard/youtubeMiniatureAddToFav";
import { Loader2 } from "lucide-react";

const SearchResults = ({
  mutation,
}: {
  mutation: UseMutationResult<
    YoutubeResult,
    Error,
    {
      searchValue: string;
      numberOfResults: string;
    },
    unknown
  >;
}) => {
  const { data, isPending, error } = mutation;

  if (isPending)
    return (
      <div className="flex h-full items-center justify-center text-center">
        <Loader2 className="animate-spin" size={64} />
      </div>
    );

  if (error) return <p>error : {error.message}</p>;

  if (data === undefined)
    return (
      <div className="flex h-full items-center justify-center text-center">
        No results yet, please type in the search bar.
      </div>
    );

  return (
    <>
      {data.items.length > 0 ? (
        <ul className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {data.items.map((item) => (
            <YoutubeMiniatureAddToFav
              key={item.id.videoId}
              videoId={item.id.videoId}
              videoTitle={item.snippet.title}
            />
          ))}
        </ul>
      ) : (
        <div className="flex h-full items-center justify-center text-center">
          No results were found.
        </div>
      )}
    </>
  );
};

export default SearchResults;
