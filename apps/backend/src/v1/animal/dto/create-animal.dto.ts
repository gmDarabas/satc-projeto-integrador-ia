import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Especie } from "../entities/animal.entity";

export class CreateAnimalDto {
  @IsEnum(Especie)
  especie: Especie;

  @IsString()
  @IsNotEmpty()
  raca: string;

  @IsInt()
  @IsNotEmpty()
  idade: number;

  @IsNumber()
  @IsNotEmpty()
  peso: number;

  @IsString()
  @IsNotEmpty()
  nome: string;
}
