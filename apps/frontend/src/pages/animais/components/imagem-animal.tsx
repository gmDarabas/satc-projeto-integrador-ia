import { Imagem } from "@/api/imagens/create";
import { useMemo, useState } from "react";

type Params = {
  imagem?: Imagem;
};

export default function ImagemAnimal({ imagem }: Params) {
  const [hasError, setHasError] = useState(false);
  const imageSrc = useMemo(() => {
    if (!imagem || hasError) return "./paw.png"; // retorna imagem padrao

    // Convert the binary data to a Uint8Array
    const uint8Array = new Uint8Array(imagem.data.data);

    // Convert Uint8Array to a string of binary characters
    let binaryString = "";
    for (let i = 0; i < uint8Array.length; i++) {
      binaryString += String.fromCharCode(uint8Array[i]);
    }

    // Convert the binary string to a base64 string
    return "data:image/jpeg;base64," + btoa(binaryString);
  }, [hasError, imagem]);

  return (
    <div className="w-28 h-28 flex items-center justify-center rounded-full overflow-hidden">
      <img src={imageSrc} alt="Imagem" onError={() => setHasError(true)} />
    </div>
  );
}
