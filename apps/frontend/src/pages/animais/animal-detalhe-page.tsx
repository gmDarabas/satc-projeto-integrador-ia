import { useParams } from "react-router-dom";
import AnimalForm from "./components/form";

export default function AnimalDetalhesPage() {
  const { animalId } = useParams();

  return (
    <div className="mx-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Informações do Pet</h2>

      <AnimalForm animalId={animalId ? +animalId : undefined} />
    </div>
  );
}
