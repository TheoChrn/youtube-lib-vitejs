import { User, Video } from "@/types/types";

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Makes a fetch request with error handling.
 * @template T - The expected return type.
 * @param url - The URL to fetch.
 * @param options - Optional fetch options.
 * @returns A promise that resolves to the parsed JSON response.
 */
const fetchWithHandling = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }
    return await response.json();
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
};

/**
 * Fetches a user by their name.
 * @param userName - The name of the user to fetch.
 * @returns A promise that resolves to the fetched user.
 */
export const fetchUserByName = async (userName: string): Promise<User> => {
  const url = `http://localhost:3001/api/user/${userName}`;
  return fetchWithHandling(url);
};

/**
 * Adds a new video to the user's favorites.
 * @param userName - The name of the user to add the video to.
 * @param newVideo - The video to add to the user's favorites.
 * @returns A promise that resolves to an object containing the success status and the added video.
 */
export const addVideo = async (
  userName: User["name"],
  newVideo: Video
): Promise<{ success: boolean; responseData: Video }> => {
  const url = `http://localhost:3001/api/user/${userName}/videos`;
  const options: RequestInit = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(newVideo),
  };

  const responseData = await fetchWithHandling<Video>(url, options);

  return { success: true, responseData };
};

/**
 * Updates the title of a specific video.
 * @param userName - The name of the user who owns the video.
 * @param videoId - The ID of the video to update.
 * @param newTitle - The new title for the video.
 * @returns A promise that resolves to an object containing the success status and the response data.
 */
export const updateVideoTitle = async (
  userName: User["name"],
  videoId: Video["id"],
  newTitle: Video["title"]
): Promise<{
  success: boolean;
  responseData: { message: string; data: string };
}> => {
  const url = `http://localhost:3001/api/user/${userName}/videos/${videoId}`;
  const options: RequestInit = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ title: newTitle }),
  };

  const responseData = await fetchWithHandling<{
    message: string;
    data: Video["title"];
  }>(url, options);

  return { success: true, responseData };
};
