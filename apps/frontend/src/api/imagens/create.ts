import { useMutation } from "react-query";
import apiBackend from "../api";
import { useToast } from "@/components/ui/use-toast";
import { Especie } from "../sintomas/create";

export type Imagem = {
  id: number;
  data: any;
  filename: string;
};

type Response = {
  imagem: Imagem;
  predicao: {
    raca: string;
    especie: Especie;
  };
};

export const create = async (data: File): Promise<Response> => {
  const fd = new FormData();
  fd.append("file", data);
  const result = await apiBackend.post<Response>("/api/v1/imagens", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result.data;
};

export const useCreateImagem = (options?: Record<string, unknown>) => {
  const { toast } = useToast();

  return useMutation(async (params: File) => create(params), {
    ...options,
    onError: () => {
      toast({ title: "Erro ao cadastrar imagem", variant: "destructive" });
    },
  });
};
