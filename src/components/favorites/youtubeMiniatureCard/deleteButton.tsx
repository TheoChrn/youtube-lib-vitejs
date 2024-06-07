import { Button } from "@/components/ui/button";
import { FavoritesThumbNailController } from "@/controllers/favoritesThumbnailController";
import UseRetrieveUserData from "@/hooks/useGetUserDataFromCache";
import { User, Video } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteIcon } from "lucide-react";
import { toast } from "sonner";

const DeleteButton = ({ videoId }: { videoId: Video["id"] }) => {
  const queryClient = useQueryClient();
  const user = UseRetrieveUserData();

  const { mutate } = useMutation({
    mutationFn: (data: { userName: User["name"]; videoId: Video["id"] }) => {
      return FavoritesThumbNailController.deleteVideoFromFavorites(
        data.userName,
        data.videoId
      );
    },
    onError: (error) => {
      toast.error(error.message, { id: "deleteVideo" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Vidéo supprimée des favoris", { id: "deleteVideo" });
    },
    onMutate: () => {
      toast.loading("Deleting video from favorites", { id: "deleteVideo" });
    },
  });

  return (
    <Button onClick={() => mutate({ userName: user.name, videoId })}>
      <DeleteIcon className="rotate-180" />
      <span className="sr-only">Delete button</span>
    </Button>
  );
};

export default DeleteButton;
