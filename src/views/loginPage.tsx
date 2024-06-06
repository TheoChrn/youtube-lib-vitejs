import { NavLink } from "@/components/ui/navlink";

const LoginPage = () => {
  return (
    <main className="flex min-h-[50svh] flex-col justify-center items-center gap-y-8">
      <h1 className="text-3xl">Select one user to connect</h1>
      <div className="flex gap-x-6">
        <NavLink variant="youtube" size={"youtube"} to={`/user/john`}>
          John
        </NavLink>
        <NavLink variant="youtube" size={"youtube"} to={`/user/mark`}>
          Mark
        </NavLink>
      </div>
    </main>
  );
};

export default LoginPage;
