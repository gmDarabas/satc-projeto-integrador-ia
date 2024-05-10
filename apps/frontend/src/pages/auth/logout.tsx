import { useAuthContext } from "@/components/auth-context";
import { Navigate } from "react-router-dom";

export function Logout() {
  const { setAuthContext } = useAuthContext();

  setAuthContext(undefined);

  return <Navigate to="/" />;
}
