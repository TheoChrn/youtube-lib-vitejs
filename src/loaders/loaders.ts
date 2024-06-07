import { fetchUserByName } from "@/services/userService";
import { User } from "@/types/types";
import { QueryClient, queryOptions } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";

export const userLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.userName) {
      throw new Error("No userName provided");
    }
    await queryClient.ensureQueryData(userDataQuery(params.userName));
    return { userName: params.userName };
  };

export const userDataQuery = (userName: User["name"]) =>
  queryOptions({
    queryKey: ["user", userName],
    queryFn: async () => {
      const user = await fetchUserByName(userName);
      if (!user) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }
      return user;
    },
  });
