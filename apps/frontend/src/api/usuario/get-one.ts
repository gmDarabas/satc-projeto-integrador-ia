import { useQuery } from "react-query";
import apiBackend from "../api";
import { Usuario, useAuthContext } from "@/components/auth-context";

export const getOne = async (id: number): Promise<Usuario> => {
  const result = await apiBackend.get<Usuario>(`/api/v1/usuarios/${id}`);
  return result.data;
};

export const useGetPerfil = () => {
  const { authContext } = useAuthContext();

  if (!authContext) {
    throw new Error("Auth context not defined");
  }

  const usuarioId = authContext.usuario.id;
  return useQuery({
    queryKey: ["perfil", usuarioId],
    queryFn: () => getOne(usuarioId),
  });
};
