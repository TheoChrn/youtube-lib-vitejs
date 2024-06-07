import { deleteVideo, updateVideoTitle } from "@/services/thumbnailService";
import { User, Video } from "@/types/types";

export class FavoritesThumbNailController {
  /**
   * Updates the title of a specific video.
   * @param userName - The name of the user who owns the video.
   * @param videoId - The ID of the video to update.
   * @param newTitle - The new title for the video.
   * @returns A promise that resolves to an object containing the success status and the response data.
   */
  static async updateVideoTitleInFavorites(
    userName: User["name"],
    videoId: Video["id"],
    newTitle: Video["title"]
  ): Promise<{
    success: boolean;
    responseData: { message: string; data: string };
  }> {
    return updateVideoTitle(userName, videoId, newTitle);
  }

  /**
   * Deletes a specific video from the user's favorites.
   * @param userName - The name of the user who owns the video.
   * @param videoId - The ID of the video to delete.
   * @returns A promise that resolves to an object containing the success status and the response data.
   */
  static async deleteVideoFromFavorites(
    userName: User["name"],
    videoId: Video["id"]
  ): Promise<{
    success: boolean;
    responseData: { message: string };
  }> {
    return deleteVideo(userName, videoId);
  }
}
