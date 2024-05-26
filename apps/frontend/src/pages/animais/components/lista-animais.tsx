import { useListAnimais } from "@/api/animais/list";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import CardAnimal from "./card-animal";

export default function ListaAnimais() {
  const { data: animais = [] } = useListAnimais();
  const navigate = useNavigate();
  const navegarCriar = () => navigate("/cadastrar-sintoma");

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Lista de Animais
        <Button className="ml-2 rounded-full" variant="outline" size="icon" onClick={navegarCriar}>
          <PlusIcon />
        </Button>
      </h2>

      <div className="w-95/100 lg:w-3/5 mx-auto">
        {animais.map((animal, index) => (
          <CardAnimal animal={animal} key={index} />
        ))}
      </div>
    </div>
  );
}
