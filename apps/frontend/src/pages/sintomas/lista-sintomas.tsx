import { useGetSintomasByAnimal } from "@/api/sintomas/get-by-animal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <div className="h-full w-95/100 lg:w-3/5 mx-auto">
      <div className="mt-8">
        <Button className="mb-2 w-full bg-sky-600" onClick={() => navigate(`/animal/${animalId}/cadastrar-sintoma`)}>
          Novo Sintoma
        </Button>
      </div>

      {sintomas &&
        sintomas.map((sintoma, index) => (
          <Card key={index} className="p-4 mt-8">
            <p className="text-gray-700 text-lg">
              <strong>{sintoma.descricao}</strong>
            </p>
            <p className="text-gray-700 text-base mt-6 mx-2">
              <strong>Pré-Diagnóstico:</strong> {sintoma.diagnostico}
            </p>
            {sintoma.createdAt && <SintomaDateBadge date={sintoma.createdAt} />}
          </Card>
        ))}
    </div>
  );
}
