import { useListAnimais } from "@/api/animais/list";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

export default function ListaAnimais() {
  const { data: animais = [] } = useListAnimais();
  const navigate = useNavigate();
  const navegarCriar = () => navigate("/cadastrar-sintoma");

  return (
    <div className="px-5">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Lista de Animais
        <Button className="ml-2" variant="outline" size="icon" onClick={navegarCriar}>
          <PlusCircledIcon />
          {/* <ChevronRightIcon className="h-4 w-4" /> */}
        </Button>
      </h2>
      {animais.map((animal, index) => (
        <div
          className="bg-gray-100 rounded-lg shadow-md p-4 mb-4 cursor-pointer"
          key={index}
          onClick={() => navigate(`/animal/${animal.id}/cadastrar-sintoma`)}
        >
          <h3 className="text-xl font-semibold mb-2">{animal.nome}</h3>
          <p>
            <strong>Espécie:</strong> {animal.especie}
          </p>
          <p>
            <strong>Raça:</strong> {animal.raca}
          </p>
          <p>
            <strong>Idade:</strong> {animal.idade}
          </p>
          <p>
            <strong>Peso:</strong> {animal.peso}
          </p>
        </div>
      ))}
    </div>
  );
}
