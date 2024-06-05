import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Especie, sintomaSchema, useCreateSintoma } from "@/api/sintomas/create";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { getOne as getOneAnimal } from "@/api/animais/get-one";
import { useCreateImagem } from "@/api/imagens/create";

//todo - verificar forma de transformar o form de animal em genérico pra só adicionar os campos necessários para os sintomas aqui
//todo - ajustar com backend pra salvar edições do pet separadamente do cadastro de novos sintomas (ainda estamos considerando ambos em uma mesma tela)

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

type Params = {
  animalId?: number;
};

export default function SintomaForm({ animalId }: Params) {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");

  const form = useForm<z.infer<typeof sintomaSchema>>({ resolver: zodResolver(sintomaSchema) });
  const { mutateAsync: criarSintoma } = useCreateSintoma();
  const { mutateAsync: criarImagem } = useCreateImagem();

  const onSubmit = async (values: z.infer<typeof sintomaSchema>) => {
    const sintoma = await criarSintoma(values);
    navigate(`/sintoma/${sintoma.id}`);
  };

  // todo usar react query
  const loadAnimal = async () => {
    if (animalId && !isNaN(+animalId)) {
      const animal = await getOneAnimal(+animalId);

      if (animal.imagem) {
        // converte o binario para blob e seta o preview
        const byteArray = new Uint8Array(animal.imagem.data.data);
        const blob = new Blob([byteArray], { type: "application/octet-stream" });
        const preview = URL.createObjectURL(blob);
        setPreview(preview);
      }

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div>
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
        </div>

        {/* todo - ajustar backend para salvar atualização do cadastro do pet e salvar os sintomas */}
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Novo Sintoma</FormLabel>
              <FormControl>
                <Input placeholder="Detalhe os sintomas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col pt-4 md:flex-row md:space-y-0 md:space-x-2">
          <Button className="w-full md:w-1/2 order-3 md:order-1" variant="outline" onClick={() => navigate("/")}>
            Voltar
          </Button>

          {animalId && (
            <Button
              className="w-full mb-2 md:w-1/2 order-2 md:order-2"
              variant="outline"
              onClick={() => navigate(`/animal/${animalId}/sintomas`)}
            >
              Histórico de Sintomas
            </Button>
          )}

          <Button type="submit" className="mb-2 w-full md:w-1/2 order-1 md:order-2">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
