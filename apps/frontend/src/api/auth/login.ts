import apiBackend from "../api";

type LoginParam = {
  email: string;
  senha: string;
};
type LoginResponse = {
  accessToken: string;
  usuario: any;
};

export const login = async (data: LoginParam): Promise<LoginResponse> => {
  const result = await apiBackend.post<LoginResponse>("/api/v1/auth/login", data);
  return result.data;
};
