import { userDataQuery } from "@/views/userPage";
import { QueryClient } from "@tanstack/react-query";
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
