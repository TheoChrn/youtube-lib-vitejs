import { fetchWithHandling } from "@/lib/utils";
import { User } from "@/types/types";

/**
 * Fetches a user by their name.
 * @param userName - The name of the user to fetch.
 * @returns A promise that resolves to the fetched user.
 */
export const fetchUserByName = async (userName: string): Promise<User> => {
  const url = `http://localhost:3001/api/user/${userName}`;
  return fetchWithHandling(url);
};
