import { useListAnimais } from "@/api/animais/list";
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

      <div className="w-95/100 lg:w-3/5 mx-auto">
        {animais.map((animal, index) => (
          <CardAnimal animal={animal} key={index} />
        ))}
      </div>

      <div>
        <Card
          className="flex shadow-lg rounded-lg p-3 my-2 flexp-4  items-center justify-center bg-gray-100"
          onClick={navegarCriar}
        >
          Novo Pet
        </Card>
      </div>
    </div>
  );
}
