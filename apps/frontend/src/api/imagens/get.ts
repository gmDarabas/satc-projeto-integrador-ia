import { useQuery } from "react-query";
import apiBackend from "../api";
import { Imagem } from "./create";

export const getOne = async (id: number): Promise<Imagem> => {
  const result = await apiBackend.get<Imagem>("/api/v1/imagens/" + id);
  return result.data;
};

export const useListAnimais = (id?: number) => {
  return useQuery<Imagem | undefined>({
    queryKey: ["imagem", id],
    queryFn: () => (id ? getOne(id) : undefined),
    enabled: !!id,
  });
};
