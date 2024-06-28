import { useQuery } from "react-query";
import apiBackend from "../api";
import { Sintoma } from "./create";

export const getByAnimal = async (id: number): Promise<Sintoma[]> => {
  const result = await apiBackend.get<Sintoma[]>(`/api/v1/sintomas/animal/${id}`);
  return result.data;
};

export const useGetSintomasByAnimal = (id?: number) => {
  return useQuery({
    queryKey: ["sintomas-animal", id],
    queryFn: () => (id ? getByAnimal(id) : null),
    enabled: !!id,
  });
};
