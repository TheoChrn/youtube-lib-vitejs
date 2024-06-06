import { Button } from "@/components/ui/button";
import UseRetrieveUserData from "@/hooks/useGetUserDataFromCache";
import { updateVideoTitle } from "@/services/userService";
import { User, Video } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { FavoriteSectionProps } from "../favoritesSection";
import RenderTitleEditionButton from "./renderTitleEditionButton";
import YoutubeMiniatureImg from "./youtubeMiniatureImg";

interface YoutubeMiniatureCardWithEditionProps extends FavoriteSectionProps {
  video: Video;
}

const YoutubeMiniatureCardWithEdition = (
  props: YoutubeMiniatureCardWithEditionProps
) => {
  const { video } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(video.title);
  const queryClient = useQueryClient();

  const user = UseRetrieveUserData();

  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationFn: (data: {
      userName: User["name"];
      videoId: Video["id"];
      newTitle: Video["title"];
    }) => {
      return updateVideoTitle(data.userName, data.videoId, data.newTitle);
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
      mutate({
        userName: user.name,
        videoId: video.id,
        newTitle: editingValue,
      });
    }
  };

  return (
    <figure className="flex flex-col font-bold aspect-video gap-y-2 px-2 first:pl-0 last:pr-0">
      <YoutubeMiniatureImg
        videoId={video.id}
        handleClick={() => handleMiniatureClick()}
      />
      <figcaption className="relative flex flex-row  justify-between items-center">
        <Button
          className="absolute hover:scale-110 duration-200 right-5 top-1 bg-transparent pl-0"
          onClick={() => handleEditionButtonClick()}
        >
          <RenderTitleEditionButton
            isPending={isPending}
            isEditing={isEditing}
          />
        </Button>
        {isEditing ? (
          <textarea
            className="w-full "
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
          />
        ) : (
          <p
            className={`${
              isPending ? "text-gray-400" : "text-foreground"
            } textEllipsisAfter2`}
          >
            {isPending
              ? editingValue
              : isSuccess
              ? data.responseData?.data
              : video.title}
          </p>
        )}
      </figcaption>
    </figure>
  );
};

export default YoutubeMiniatureCardWithEdition;
