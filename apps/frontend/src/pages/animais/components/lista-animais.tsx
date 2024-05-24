import { useListAnimais } from "@/api/animais/list";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import ImagemAnimal from "./imagem-animal";
import { Badge } from "@/components/ui/badge";

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
          <div
            key={index}
            className="flex items-center bg-white shadow-lg rounded-lg p-4 mb-4 cursor-pointer"
            onClick={() => navigate(`/animal/${animal.id}/cadastrar-sintoma`)}
          >
            <ImagemAnimal imagem={animal.imagem} />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">{animal.nome}</h2>
              <p className="text-gray-700">
                <Badge>{animal.especie}</Badge> <Badge>{animal.raca}</Badge>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
