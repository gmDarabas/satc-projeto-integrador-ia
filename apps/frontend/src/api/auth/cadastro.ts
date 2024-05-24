import apiBackend from "../api";
import { Usuario } from "./login";

type LoginParam = {
  nome: string;
  email: string;
  senha: string;
};

type Response = Usuario;

export const cadastro = async (data: LoginParam): Promise<Response> => {
  const result = await apiBackend.post<Response>("/api/v1/usuarios", data);
  return result.data;
};
