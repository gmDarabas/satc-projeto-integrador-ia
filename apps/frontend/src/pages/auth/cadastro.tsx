import { cadastro } from "@/api/auth/cadastro";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface CadastroForm {
  nome: string;
  email: string;
  senha: string;
}

export default function Cadastro() {
  const navigate = useNavigate();

  const onSubmit = async (payload: CadastroForm) => {
    try {
      await cadastro(payload);
      navigate("/");
    } catch (e) {
      console.log({ e });
    }
  };

  const formSchema = z.object({
    nome: z.string(),
    email: z.string().email({
      message: "Insira um email válido",
    }),
    senha: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
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

        <Button type="submit" className="w-full">
          Cadastro
        </Button>
        <p onClick={() => navigate("/login")} className="text-sky-600 mb-4 text-center cursor-pointer">
          Login
        </p>
      </form>
    </Form>
  );
}
