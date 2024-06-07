import useAddVideo from "@/hooks/useAddVideo";
import UseRetrieveUserData from "@/hooks/useGetUserDataFromCache";
import { VideoThumbNailModel } from "@/models/videoThumbnailModel";
import YoutubeMiniatureImg from "./youtubeMiniatureImg";
import { Video } from "@/types/types";

const YoutubeMiniatureAddToFav = ({
  videoId,
  videoTitle,
}: {
  videoId: Video["id"];
  videoTitle: Video['title'];
}) => {
  const addVideoMutation = useAddVideo();
  const newVideo = { title: videoTitle, id: videoId };
  const user = UseRetrieveUserData();

  const videoModel = new VideoThumbNailModel(videoId, videoTitle);

  /**
   * Add the video to favorites
   * @returns void
   */
  const handleClick = () => {
    addVideoMutation.mutate({ userName: user.name, newVideo });
  };

  /**
   * Stringify the new video object in the dataTransfer
   * @param e Drag Event
   */
  const handleOnDrag = (e: React.DragEvent) => {
    e.dataTransfer.setData("newVideo", JSON.stringify(newVideo));
  };

  return (
    <figure
      draggable
      onDragStart={(e) => handleOnDrag(e)}
      className={`flex flex-col font-bold cursor-pointer hover:scale-105 duration-200`}
    >
      <YoutubeMiniatureImg
        alt={videoTitle}
        src={videoModel.getThumbnailUrl()}
        onClick={() => handleClick()}
      />
      <figcaption className="textEllipsisAfter2">{videoTitle}</figcaption>
    </figure>
  );
};

export default YoutubeMiniatureAddToFav;
