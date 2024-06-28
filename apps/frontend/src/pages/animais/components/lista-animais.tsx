import { useListAnimais } from "@/api/animais/list";
import { useNavigate } from "react-router-dom";
import CardAnimal from "./card-animal";
import Ellipse from "../../../assets/Ellipse.svg";
import { Button } from "@/components/ui/button";

export default function ListaAnimais() {
  const { data: animais = [] } = useListAnimais();
  const navigate = useNavigate();
  const navegarCriar = () => navigate("/cadastrar-sintoma");

  return (
    <div className="h-full w-95/100 lg:w-3/5 mx-auto mb-20">
      <h2 className="text-2xl font-bold mt-6 mb-12 text-center">Lista de Animais</h2>

      <div>
        <div className="flex items-center justify-center h-full">
          <img className="flex align-middle" src={Ellipse} alt="Centered Image"></img>
        </div>
        <div className="mt-8">
          <Button
            className="flex w-full flex-col items-center justify-center rounded-lg p-2 my-2 font-bold bg-sky-600 cursor-pointer"
            onClick={navegarCriar}
          >
            Novo Pet
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <div>
          {animais.map((animal, index) => (
            <CardAnimal animal={animal} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
