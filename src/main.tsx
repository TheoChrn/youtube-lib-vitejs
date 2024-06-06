import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import LoginPage from "./views/loginPage";
import UserPage from "./views/userPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { userLoader } from "./loaders/loaders";
import ErrorPage from "./views/errorPage";
import Root from "./views/root";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/user/:userName",
        element: <UserPage />,
        loader: userLoader(queryClient),
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
