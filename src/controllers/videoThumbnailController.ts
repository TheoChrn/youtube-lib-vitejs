import { addVideo } from "@/services/thumbnailService";
import { User, Video } from "@/types/types";

export class VideoThumbNailController {
  /**
   * Adds a new video to the user's favorites.
   * @param userName - The name of the user to add the video to.
   * @param newVideo - The video to add to the user's favorites.
   * @returns A promise that resolves to an object containing the success status and the added video.
   */
  static async addVideoToFavorites(
    userName: User["name"],
    newVideo: Video
  ): Promise<{ success: boolean; responseData: Video }> {
    return addVideo(userName, newVideo);
  }
}
