import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useUpdatePerfil, usuarioSchema } from "@/api/usuario/update";
import { useGetPerfil } from "@/api/usuario/get-one";

export default function PerfilForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof usuarioSchema>>({ resolver: zodResolver(usuarioSchema) });
  const { mutateAsync: updatePerfil } = useUpdatePerfil();

  const onSubmit = async (values: z.infer<typeof usuarioSchema>) => {
    if (!perfil) return;

    await updatePerfil({ id: perfil.id, params: values });
    navigate(`/`);
  };

  const { data: perfil } = useGetPerfil();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="Senha" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmarSenha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <Input placeholder="Senha" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mb-2 w-full bg-sky-600">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
