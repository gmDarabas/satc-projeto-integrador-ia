import { useGetSintoma } from "@/api/sintomas/get-one";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function SintomaDetalhePage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { id } = useParams();
  const temId = id && !isNaN(+id);

  if (!id) {
    toast({ title: "Página não encontrada", description: "Voltando à página inicial" });
    navigate("/");
  }

  const { data: sintoma } = useGetSintoma(temId ? +id : undefined);

  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <h2 className="text-2xl font-bold mb-4 text-center">Sintoma</h2>

      <div className="grid w-full w-10/12 items-center gap-1.5 mb-5">
        <Label htmlFor="sintoma">Sintoma</Label>
        <Textarea id="sintoma" disabled value={sintoma?.descricao} />
      </div>

      <div className="grid w-full w-10/12 items-center gap-1.5">
        <Label htmlFor="diagnostico">Pré Diagnóstico</Label>
        <Textarea id="diagnostico" disabled value={sintoma?.diagnostico} rows={6} />
        <p className="text-sm text-muted-foreground">
          Este é apenas um pré diagnóstico, consulte um veterinário capacitado assim que possível
        </p>
      </div>

      <Button className="w-10/12 mx-auto mt-12" onClick={() => navigate("/")}>
        Voltar
      </Button>
    </div>
  );
}