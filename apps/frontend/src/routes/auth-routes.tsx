import AuthLayout from "@/pages/auth/layout";
import Login from "@/pages/auth/login";
import { Route, Navigate } from "react-router-dom";

export function AuthRoutes() {
  return (
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
      {/* <Route path='/cadastro' element={<CadastroUsuario />} /> */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Route>
  );
}
