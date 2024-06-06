import { User } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Retrieve the user's data from the cache
 * @returns User
 */
const UseRetrieveUserData = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueriesData({ queryKey: ["user"] });

  return user[0][1] as User;
};

export default UseRetrieveUserData;
