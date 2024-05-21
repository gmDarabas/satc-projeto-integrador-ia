import { useListAnimais } from "@/api/animais/list";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImagemAnimal from "./imagem-animal";
import { Badge } from "@/components/ui/badge";

export default function ListaAnimais() {
  const { data: animais = [] } = useListAnimais();
  const navigate = useNavigate();
  const navegarCriar = () => navigate("/cadastrar-sintoma");


  useEffect(() => {
    console.log({animais})
  }, [animais])

  return (
    <div className="px-5 bg-[#f7f7f7] h-[100vh]">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Lista de Animais
        <Button className="ml-2" variant="outline" size="icon" onClick={navegarCriar}>
          <PlusCircledIcon />
        </Button>
      </h2>
      <div className="w-95/100 lg:w-3/5 mx-auto">
        {animais.map((animal, index) => (
          <div key={index} className="flex items-center bg-white shadow-lg rounded-lg p-4 mb-4">
            <ImagemAnimal imagem={animal.imagem} />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">{animal.nome}</h2>
              <p className="text-gray-700">
                <Badge>{animal.especie}</Badge> <Badge>{animal.raca}</Badge>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
