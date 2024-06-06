import { YoutubeResult } from "@/types/types";

/**
 * Fetch a number of youtube video's title base on a search value and the number of max results
 * @param searchValue
 * @param maxResults
 * @returns an object of type YoutubeResult
 */
export const fetchYoutubeResults = async (
  searchValue: string,
  maxResults: string
): Promise<YoutubeResult> => {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${searchValue}&type=video&key=${apiKey}`,
      { method: "GET" }
    );
    if (!response.ok) {
      // Handle non-2xx HTTP responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const youtubeResults: YoutubeResult = await response.json();
    return youtubeResults;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Failed to fetch");
  }
};
