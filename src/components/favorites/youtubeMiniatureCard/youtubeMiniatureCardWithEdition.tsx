import { Button } from "@/components/ui/button";
import UseRetrieveUserData from "@/hooks/useGetUserDataFromCache";
import { User, Video } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { FavoritesThumbNailController } from "../../../controllers/favoritesThumbnailController";
import { FavoriteSectionProps } from "../favoritesSection";
import DeleteButton from "./deleteButton";
import RenderTitleEditionButton from "./renderTitleEditionButton";
import YoutubeMiniatureImg from "./youtubeMiniatureImg";
import { VideoThumbNailModel } from "@/models/videoThumbnailModel";

interface YoutubeMiniatureCardWithEditionProps extends FavoriteSectionProps {
  video: Video;
}

const YoutubeMiniatureCardWithEdition = (
  props: YoutubeMiniatureCardWithEditionProps
) => {
  const queryClient = useQueryClient();
  const { video } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(video.title);

  const user = UseRetrieveUserData();

  const videoModel = new VideoThumbNailModel(video.id, video.title);

  const updateMutation = useMutation({
    mutationFn: (data: {
      userName: User["name"];
      videoId: Video["id"];
      newTitle: Video["title"];
    }) => {
      return FavoritesThumbNailController.updateVideoTitleInFavorites(
        data.userName,
        data.videoId,
        data.newTitle
      );
    },
    onError: () => {
      toast.error("Failed to update title");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Title updated !");
      setEditingValue(data.responseData?.data ?? video.title);
    },
  });

  /**
   * When clicking on a miniature, displays the youtube embed video
   * @returns Nothing
   */
  const handleMiniatureClick = () => {
    props.setIsSearching(false);
    props.setCurrentVideo(video);
  };

  /**
   * Toggle edition mode
   * Update the title if the new value is different than the previous one
   * @returns Nothing
   */
  const handleEditionButtonClick = () => {
    setIsEditing(!isEditing);
    if (editingValue === video.title) {
      return;
    }
    if (isEditing) {
      updateMutation.mutate(
        {
          userName: user.name,
          videoId: video.id,
          newTitle: editingValue,
        },
        {
          onSuccess: (data) => {
            setEditingValue(data.responseData?.data ?? video.title);
          },
        }
      );
    }
  };

  return (
    <figure className="flex flex-col font-bold aspect-video gap-y-2 px-2 first:pl-0 last:pr-0">
      <YoutubeMiniatureImg
        alt={video.title}
        src={videoModel.getThumbnailUrl()}
        onClick={() => handleMiniatureClick()}
      />
      <figcaption className="relative flex flex-row  items-start">
        <DeleteButton videoId={video.id} />
        <Button
          className="absolute hover:scale-110 duration-200 right-5 top-1 bg-transparent pl-0"
          onClick={() => handleEditionButtonClick()}
        >
          <span className="sr-only">Edit button</span>
          <RenderTitleEditionButton
            isPending={updateMutation.isPending}
            isEditing={isEditing}
          />
        </Button>
        {isEditing ? (
          <textarea
            className="w-full max-w-[80%]"
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
            maxLength={100}
          />
        ) : (
          <p
            className={`${
              updateMutation.isPending ? "text-gray-400" : "text-foreground"
            } textEllipsisAfter2`}
          >
            {updateMutation.isPending
              ? editingValue
              : updateMutation.isSuccess
              ? updateMutation.data.responseData?.data
              : video.title}
          </p>
        )}
      </figcaption>
    </figure>
  );
};

export default YoutubeMiniatureCardWithEdition;
