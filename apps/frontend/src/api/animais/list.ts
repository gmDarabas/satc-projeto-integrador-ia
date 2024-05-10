import { useQuery } from "react-query";
import apiBackend from "../api";
import { Especie } from "../sintomas/create";

export type Animal = {
  id: number;
  especie: Especie;
  raca: string;
  idade: number;
  peso: number;
  nome: string;
};

export const list = async (): Promise<Animal[]> => {
  const result = await apiBackend.get<Animal[]>("/api/v1/animais");
  return result.data;
};

export const useListAnimais = () => {
  return useQuery({
    queryKey: ["animais"],
    queryFn: list,
  });
};
