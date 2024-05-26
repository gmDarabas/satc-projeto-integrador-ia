import { useMutation, useQueryClient } from "react-query";
import apiBackend from "../api";
import { Animal } from "../animais/list";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

export enum Especie {
  Cachorro = "Cachorro",
  Gato = "Gato",
  Coelho = "Coelho",
  Hamster = "Hamster",
}

export type Sintoma = {
  id?: number;
  descricao: string;
  animal: Animal;
  diagnostico?: string;
  createdAt?: string;
};

export const sintomaSchema = z.object({
  animal: z.object({
    especie: z.nativeEnum(Especie),
    raca: z.string(),
    idade: z.coerce.number(),
    peso: z.coerce.number(),
    nome: z.string(),
    imagem_id: z.number().optional(),
  }),
  descricao: z.string(),
});

export type SchemaType = z.infer<typeof sintomaSchema>;

export const create = async (data: SchemaType): Promise<Sintoma> => {
  const result = await apiBackend.post<Sintoma>("/api/v1/sintomas", data);
  return result.data;
};

export const useCreateSintoma = (options?: Record<string, unknown>) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(async (params: SchemaType) => create(params), {
    ...options,
    onSuccess: async () => {
      queryClient.invalidateQueries("animais");
    },
    onError: () => {
      toast({ title: "Erro ao cadastrar sintoma", variant: "destructive" });
    },
  });
};
