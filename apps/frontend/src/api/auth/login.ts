import apiBackend from "../api";

export type Usuario = {
  id: number;
  nome: string;
  email: string;
};

type LoginParam = {
  email: string;
  senha: string;
};

type LoginResponse = {
  accessToken: string;
  usuario: Usuario;
};

export const login = async (data: LoginParam): Promise<LoginResponse> => {
  const result = await apiBackend.post<LoginResponse>("/api/v1/auth/login", data);
  return result.data;
};
