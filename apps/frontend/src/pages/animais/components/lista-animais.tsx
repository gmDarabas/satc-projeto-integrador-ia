import { useListAnimais } from "@/api/animais/list";
import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import CardAnimal from "./card-animal";
import { Card } from "@/components/ui/card";

export default function ListaAnimais() {
  const { data: animais = [] } = useListAnimais();
  const navigate = useNavigate();
  const navegarCriar = () => navigate("/cadastrar-sintoma");

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Animais</h2>

      <div>
        <Card
          className="flex shadow-lg rounded-lg mx- p-6 my-2 flexp-4  items-center justify-center bg-white"
          onClick={navegarCriar}
        >
          <PlusIcon className="size-7 text-neutral-700" />
        </Card>
      </div>

      <div className="w-95/100 lg:w-3/5 mx-auto">
        {animais.map((animal, index) => (
          <CardAnimal animal={animal} key={index} />
        ))}
      </div>
    </div>
  );
}
