import { useParams } from "react-router-dom";
import SintomaForm from "../sintomas/components/form";

export default function AnimalDetalhesPage() {
  const { animalId } = useParams();

  return (
    <div className="mx-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Informações do Animal</h2>

      <SintomaForm animalId={animalId ? +animalId : undefined} />
    </div>
  );
}
