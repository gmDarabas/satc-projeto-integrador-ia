import { useParams } from "react-router-dom";
import SintomaForm from "./components/form";

export default function NovoSintoma() {
  const { animalId } = useParams();

  return (
    <div className="mx-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Informações do Pet</h2>
      <SintomaForm animalId={animalId ? +animalId : undefined} />
    </div>
  );
}
