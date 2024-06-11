import { useListAnimais } from "@/api/animais/list";
import { useNavigate } from "react-router-dom";
import CardAnimal from "./card-animal";
import Ellipse from "../../../assets/Ellipse.png";

export default function ListaAnimais() {
  const { data: animais = [] } = useListAnimais();
  const navigate = useNavigate();
  const navegarCriar = () => navigate("/cadastrar-sintoma");

  return (
    <div className="h-full w-95/100 lg:w-3/5 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Animais</h2>

      <div>
        <div className="flex items-center justify-center h-full">
          <img className="flex align-middle" src={Ellipse} alt="Centered Image"></img>
        </div>
        <div>
          <button
            className="flex w-full flex-col items-center justify-center bg-gray-100 rounded-lg p-2 mb-5 my-2 cursor-pointer font-bold"
            onClick={navegarCriar}
          >
            Novo Pet
          </button>
        </div>
      </div>

      <div>
        <div>
          {animais.map((animal, index) => (
            <CardAnimal animal={animal} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
