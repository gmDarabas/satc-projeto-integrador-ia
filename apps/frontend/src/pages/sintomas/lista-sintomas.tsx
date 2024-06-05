import { useGetSintomasByAnimal } from "@/api/sintomas/get-by-animal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

const SintomaDateBadge = ({ date }: { date: string }) => {
  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return <Badge className="mt-2 mx-2 bg-neutral-600">Data: {formattedDate}</Badge>;
};

export default function ListaSintomasPage() {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const { data: sintomas } = useGetSintomasByAnimal(animalId ? +animalId : undefined);
  return (
    <>
      {sintomas &&
        sintomas.map((sintoma, index) => (
          <Card key={index} className="p-4 my-4">
            <p className="text-gray-700 text-lg">
              <strong>{sintoma.descricao}</strong>
            </p>
            <p className="text-gray-700 text-base mt-6 mx-2">
              <strong>Pré-Diagnóstico:</strong> {sintoma.diagnostico}
            </p>
            {sintoma.createdAt && <SintomaDateBadge date={sintoma.createdAt} />}
          </Card>
        ))}

      <div>
        <Card
          className="mx- p-3 my-2 flexp-4 flex items-center justify-center bg-gray-100"
          onClick={() => navigate(`/animal/${animalId}/cadastrar-sintoma`)}
        >
          Novo Sintoma
        </Card>
      </div>
    </>
  );
}
