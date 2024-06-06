import { Video } from "@/types/types";

const EmbedYoutubeVideo = ({ currentVideo }: { currentVideo: Video }) => {
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="rounded-3xl overflow-hidden">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
        <h3 className="font-bold">{currentVideo.title}</h3>
      </div>
    </div>
  );
};

export default EmbedYoutubeVideo;
