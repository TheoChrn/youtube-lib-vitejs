import { NavLink } from "@/components/ui/navlink";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage = "";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center min-h-[80svh] gap-5 text-center px-5"
    >
      <h1 className="text-2xl  md:text-5xl">Oops!</h1>
      <p className="text-2xl  md:text-5xl">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-3xl  md:text-7xl text-accent">
        <i>{errorMessage}</i>
      </p>
      <NavLink variant={"youtube"} size={"youtube"} className="mt-8" to="/">
        Back to login
      </NavLink>
    </div>
  );
}
