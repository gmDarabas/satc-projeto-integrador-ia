import apiBackend from "../api";
import { Animal } from "./list";

export const getOne = async (id: number): Promise<Animal> => {
  const result = await apiBackend.get<Animal>(`/api/v1/animais/${id}`);
  return result.data;
};

// export const useGetOneAnimal = () => {
//   return useQuery({
//     queryKey: ["animais"],
//     queryFn: list,
//   });
// };
