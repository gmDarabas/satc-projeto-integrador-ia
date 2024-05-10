import apiBackend from "../api";

type LoginParam = {
  nome: string;
  email: string;
  senha: string;
};

// type LoginResponse = {
//   accessToken: string;
//   usuario: any;
// };

export const cadastro = async (data: LoginParam): Promise<any> => {
  const result = await apiBackend.post<any>("/api/v1/usuarios", data);
  return result.data;
};
