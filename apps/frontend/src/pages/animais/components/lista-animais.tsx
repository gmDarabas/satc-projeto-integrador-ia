import React, { useState } from "react";
import { useListAnimais } from "@/api/animais/list";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import ImagemAnimal from "./imagem-animal";
import { Badge } from "@/components/ui/badge";

export default function ListaAnimais() {
  const { data: animais = [] } = useListAnimais();
  const navigate = useNavigate();
  // const navegarCriar = () => navigate("/cadastrar-sintoma");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Lista de Animais
        {/* <Button className="ml-2 rounded-full" variant="outline" size="icon" onClick={navegarCriar}>
          <PlusIcon />
        </Button> */}
      </h2>

      <div className="w-95/100 lg:w-3/5 mx-auto">
        {animais.map((animal, index) => (
          <div key={index} className="flex items-center bg-white shadow-lg rounded-lg p-4 mb-4 cursor-pointer">
            <div
              className="flex items-center p-2 cursor-pointer"
              onClick={() => navigate(`/animal/${animal.id}/informacoes`)}
            >
              <ImagemAnimal imagem={animal.imagem} />
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">{animal.nome}</h2>
                <p className="text-gray-700">
                  <Badge>{animal.especie}</Badge> <Badge>{animal.raca}</Badge>
                </p>
              </div>
            </div>
            <Button className="ml-2 rounded-full" variant="outline" size="icon" onClick={toggleDropdown}>
              <PlusIcon />
            </Button>
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setDropdownVisible(false);
                    navigate(`/animal/${animal.id}/cadastrar-sintoma`);
                  }}
                >
                  Novo Sintoma
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-2 md:mt-auto">
        <Button className="w-full md:w-1/2 order-3 md:order-1" variant="outline" onClick={() => navigate("/")}>
          Voltar
        </Button>
        <Button className="w-full md:w-1/2 order-2 md:order-1" variant="outline" onClick={() => navigate("/")}>
          Sintomas
        </Button>
        <Button type="submit" className="mb-2 w-full md:w-1/2 order-1 md:order-2">
          Salvar
        </Button>
      </div>
    </div>
  );
}
