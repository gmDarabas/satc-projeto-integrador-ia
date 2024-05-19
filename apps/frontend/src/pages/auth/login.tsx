import { login } from "@/api/auth/login";
import { useAuthContext } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface LoginForm {
  email: string;
  senha: string;
}

export default function Login() {
  // const [loginIncorreto, setLoginIncorreto] = useState<boolean>(false);
  const { setAuthContext } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (payload: LoginForm) => {
    try {
      const data = await login(payload);
      localStorage.setItem("token", JSON.stringify(data.accessToken));
      setAuthContext({ usuario: data.usuario });
      navigate("/");
    } catch (e) {
      // setLoginIncorreto(true);
    }
  };

  const formSchema = z.object({
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
          Login
        </Button>
      </form>
    </Form>
  );
}
