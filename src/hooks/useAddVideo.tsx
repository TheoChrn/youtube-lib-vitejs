import { VideoThumbNailController } from "@/controllers/videoThumbnailController";
import { User, Video } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useAddVideo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { userName: User["name"]; newVideo: Video }) => {
      return VideoThumbNailController.addVideoToFavorites(
        data.userName,
        data.newVideo
      );
    },
    onError: (error) => {
      toast.error(error.message, { id: "addVideo" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Vidéo ajoutée aux favoris", { id: "addVideo" });
    },
    onMutate: () => {
      toast.loading("Adding new video to favorites", { id: "addVideo" });
    },
  });

  return mutation;
};

export default useAddVideo;
