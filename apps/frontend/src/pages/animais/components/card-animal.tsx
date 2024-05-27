import { Animal } from "@/api/animais/list";
import { useNavigate } from "react-router-dom";
import ImagemAnimal from "./imagem-animal";
import { Badge } from "@/components/ui/badge";

type Params = {
  animal: Animal;
};

export default function CardAnimal({ animal }: Params) {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="flex items-center bg-white shadow-lg rounded-lg p-4 mb-4 cursor-pointer"
        onClick={() => navigate(`/animal/${animal.id}/informacoes`)}
      >
        <div className="flex items-center p-2 cursor-pointer">
          <ImagemAnimal imagem={animal.imagem} />
          <div className="ml-4">
            <h2 className="text-xl font-bold text-gray-900">{animal.nome}</h2>
            <p className="text-gray-700">
              <Badge>{animal.especie}</Badge> <Badge>{animal.raca}</Badge>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
