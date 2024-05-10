import { BrowserRouter, Routes } from "react-router-dom";
import { AuthRoutes } from "./auth-routes";
import { useAuthContext } from "@/components/auth-context";
import UserRoutes from "./user-routes";

export default function Router() {
  const { authContext } = useAuthContext();
  const estaLogado = !!authContext;

  const routes = () => {
    console.log({ estaLogado });
    if (estaLogado) {
      console.log("user routes");
      return UserRoutes();
    }

    console.log("auth routes");
    return AuthRoutes();
  };

  return (
    <BrowserRouter>
      <Routes>{routes()}</Routes>
    </BrowserRouter>
  );
}
