import { useMutation, useQueryClient } from "react-query";
import apiBackend from "../api";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

export type UpdateUsuario = {
  nome?: string;
  senha?: string;
};

export const usuarioSchema = z
  .object({
    nome: z.string().optional(),
    senha: z.string().optional(),
    confirmarSenha: z.string().optional(),
    imagem_id: z.number().optional(),
  })
  .superRefine(({ confirmarSenha, senha }, ctx) => {
    const alterandoSenha = confirmarSenha && senha;
    const senhasIguais = confirmarSenha === senha;
    if (alterandoSenha && !senhasIguais) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não são iguais",
        path: ["confirmarSenha"],
      });
    }
  });

export type SchemaType = z.infer<typeof usuarioSchema>;

export const update = async (id: number, data: SchemaType): Promise<unknown> => {
  const { confirmarSenha, ...requestData } = data;
  const result = await apiBackend.patch<unknown>(`/api/v1/usuarios/${id}`, requestData);
  return result.data;
};

export const useUpdatePerfil = (options?: Record<string, unknown>) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(async ({ id, params }: { id: number; params: SchemaType }) => update(id, params), {
    ...options,
    onSuccess: async () => {
      queryClient.invalidateQueries("perfil");
      toast({ title: "Perfil atualizado com sucesso" });
    },
    onError: () => {
      toast({ title: "Erro ao atualizar perfil", variant: "destructive" });
    },
  });
};
