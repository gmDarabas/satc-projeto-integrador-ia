import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Especie, sintomaSchema, useCreateSintoma } from "@/api/sintomas/create";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOne as getOneAnimal } from "@/api/animais/get-one";

export default function SintomasPage() {
  const navigate = useNavigate();
  const { animalId } = useParams();

  const form = useForm<z.infer<typeof sintomaSchema>>({ resolver: zodResolver(sintomaSchema) });
  const { mutateAsync: criarSintoma } = useCreateSintoma();

  const onSubmit = async (values: z.infer<typeof sintomaSchema>) => {
    const sintoma = await criarSintoma(values);
    console.log({ sintoma, link: `/sintoma/${sintoma.id}` });
    navigate(`/sintoma/${sintoma.id}`);
  };

  const loadAnimal = async () => {
    if (animalId && !isNaN(+animalId)) {
      const animal = await getOneAnimal(+animalId);

      form.setValue("animal", animal);
    }
  };

  useEffect(() => {
    loadAnimal();
  }, [animalId]);

  return (
    <div className="mx-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Relatar Sintoma</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="animal.nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do animal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="animal.especie"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Espécie</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma espécie da lista" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(Especie).map((especie) => (
                      <SelectItem key={especie} value={especie}>
                        {Especie[especie]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="animal.raca"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raça</FormLabel>
                <FormControl>
                  <Input placeholder="Raça do animal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-flow-col gap-4">
            <div className="col-span-auto">
              <FormField
                control={form.control}
                name="animal.peso"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Peso do animal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="animal.idade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Idade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sintoma</FormLabel>
                <FormControl>
                  <Input placeholder="Detalhe os sintomas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
}
