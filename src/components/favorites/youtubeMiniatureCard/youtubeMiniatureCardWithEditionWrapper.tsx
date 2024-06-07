import { Video } from "@/types/types";
import YoutubeMiniatureCardWithEdition from "./youtubeMiniatureCardWithEdition";
import { FavoriteSectionProps } from "../favoritesSection";

interface YoutubeMiniatureCardWithEditionWrapperProps
  extends FavoriteSectionProps {
  userVideos: Video[];
}

const YoutubeMiniatureCardWithEditionWrapper = (
  props: YoutubeMiniatureCardWithEditionWrapperProps
) => {
  return (
    <ul className="flex gap-y-16 gap-x-8 overflow-auto lg:flex-col h-full">
      {props.userVideos.map((video) => (
        <li
          key={video.id}
          className="flex flex-col justify-between cursor-pointer flex-[0_0_300px] lg:flex-1 h-full"
        >
          <YoutubeMiniatureCardWithEdition
            setCurrentVideo={props.setCurrentVideo}
            setIsSearching={props.setIsSearching}
            video={video}
          />
        </li>
      ))}
    </ul>
  );
};

export default YoutubeMiniatureCardWithEditionWrapper;
