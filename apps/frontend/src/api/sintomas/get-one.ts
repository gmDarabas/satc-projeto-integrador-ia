import { useQuery } from "react-query";
import apiBackend from "../api";
import { Sintoma } from "./create";

export const getOne = async (id: number): Promise<Sintoma> => {
  const result = await apiBackend.get<Sintoma>(`/api/v1/sintomas/${id}`);
  return result.data;
};

export const useGetSintoma = (id?: number) => {
  console.log({ id, type: typeof id });
  return useQuery({
    queryKey: ["sintoma", id],
    queryFn: () => (id ? getOne(id) : null),
    enabled: !!id,
  });
};
