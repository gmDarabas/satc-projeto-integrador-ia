import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateAnimalDto } from "src/v1/animal/dto/create-animal.dto";
import { UpdateAnimalDto } from "src/v1/animal/dto/update-animal.dto";

export class CreateSintomaDto {
  @ValidateNested({ each: true })
  @Type(() => CreateAnimalDto)
  animal: CreateAnimalDto | UpdateAnimalDto;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}
