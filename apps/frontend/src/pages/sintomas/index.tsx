import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Especie, sintomaSchema, useCreateSintoma } from "@/api/sintomas/create";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { getOne as getOneAnimal } from "@/api/animais/get-one";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCreateImagem } from "@/api/imagens/create";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export default function SintomasPage() {
  const navigate = useNavigate();
  const { animalId } = useParams();
  const [preview, setPreview] = useState("");

  const form = useForm<z.infer<typeof sintomaSchema>>({ resolver: zodResolver(sintomaSchema) });
  const { mutateAsync: criarSintoma } = useCreateSintoma();
  const { mutateAsync: criarImagem } = useCreateImagem();

  const onSubmit = async (values: z.infer<typeof sintomaSchema>) => {
    const sintoma = await criarSintoma(values);
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

  const onChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files, displayUrl } = getImageData(event);
    setPreview(displayUrl);

    const { imagem, predicao } = await criarImagem(files[0]);
    form.setValue("animal.imagem_id", imagem.id);
    form.setValue("animal.especie", predicao.especie);
    form.setValue("animal.raca", predicao.raca);
  };

  return (
    <div className="mx-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Relatar Sintoma</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className="grid grid-rows-1 grid-flow-col gap-4">
            <Avatar className="w-36 h-36 rounded-sm">
              <AvatarImage src={preview} />
              <AvatarFallback className="bg-white">Pet</AvatarFallback>
            </Avatar>

            <FormItem className="col-span-2">
              <FormLabel>Foto do Animal</FormLabel>
              <FormControl>
                <Input type="file" onChange={(event) => onChangeImage(event)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>

          {/* Esse campo não aparece para o usuario, serve apenas para mandar ligacao da imagem para o backend */}
          <FormField control={form.control} name="animal.imagem_id" render={() => <></>} />

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
