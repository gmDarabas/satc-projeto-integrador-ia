import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { Especie } from "src/v1/animal/entities/animal.entity";
import { Imagem } from "src/v1/imagem/entities/imagem.entity";
import { Sintoma } from "src/v1/sintoma/entities/sintoma.entity";

type AnimalIdentificado = {
  raca: string;
  especie: Especie;
};

@Injectable()
export class OpenAIService {
  private openai;
  private readonly DEFAULT_MODEL = `gpt-4o`;
  private readonly possuiKey;

  constructor(configService: ConfigService) {
    const apiKey = configService.get("OPENAI_API_KEY");
    this.possuiKey = !!apiKey;

    this.openai = new OpenAI({ apiKey: apiKey || `invalid key` });
  }

  private request(messages: any[]) {
    return this.openai.chat.completions.create({
      messages,
      model: this.DEFAULT_MODEL,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  }

  async diagnosticarAnimal(sintoma: Sintoma): Promise<string> {
    if (!this.possuiKey) return "Mussum Ipsum, cacilds vidis litro abertis. Nulla id gravida magna, ut semper sapien. ";

    const animal = sintoma.animal;
    const { especie, raca, peso, idade } = animal;

    if (!sintoma.descricao || !especie || !raca || !peso || !idade) {
      throw new Error("Melhorar esta mensagem");
    }

    const completion = await this.request([
      {
        role: "system",
        content:
          "Irei lhe infomar dados de um animal, e a descrição dos sintomas dele de acordo com o usuário. preciso que você retorne um breve parágrafo informando qual pode ser o possível diagnóstico do animal.",
      },
      {
        role: "user",
        content: `Um ${especie}, da raça ${raca} com ${peso} Kg e ${idade} anos de idade. Sintomas: ${sintoma.descricao}`,
      },
    ]);

    return completion.choices[0].message.content as string;
  }

  async identificarAnimal(imagem: Imagem): Promise<AnimalIdentificado> {
    if (!this.possuiKey) {
      return {
        especie: Especie.Cachorro,
        raca: "Mussum Ipsum",
      };
    }

    const base64 = imagem.getBase64();
    const completion = await this.request([
      {
        role: "system",
        content:
          'Irei lhe fornecer a imagem de um animal, sua resposta é para uma API e deve ser um JSON válido com os campos "especie" e "raca", onde espécie deve ser um dos seguintes valores  "Cachorro","Gato","Coelho", "Hamster". Responda apenas com um JSON válido sem formatação',
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: base64,
            },
          },
        ],
      },
    ]);

    return this.converterResposta(completion.choices[0].message.content);
  }

  private converterResposta(input: string): AnimalIdentificado {
    try {
      const parsed = JSON.parse(input);

      // Verificação se o JSON parseado contém as chaves esperadas
      if (typeof parsed.raca !== "string" || !Object.values(Especie).includes(parsed.especie)) {
        throw new Error("Formato de JSON inválido ou espécie não reconhecida.");
      }

      return {
        raca: parsed.raca,
        especie: parsed.especie as Especie,
      };
    } catch (error) {
      throw new Error("Entrada inválida: " + (error instanceof SyntaxError ? "JSON inválido." : error.message));
    }
  }
}
