import { Injectable } from "@nestjs/common";
import { CreateSintomaDto } from "../dto/create-sintoma.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { findPaginated } from "src/common/utils";
import { Page } from "src/types/interfaces";
import { Repository, FindManyOptions, UpdateResult } from "typeorm";
import { Sintoma } from "../entities/sintoma.entity";
import { AnimalService } from "src/v1/animal/services/animal.service";
import { CreateAnimalDto } from "src/v1/animal/dto/create-animal.dto";
import { OpenAIService } from "src/common/services/openai/openai.service";

@Injectable()
export class SintomaService {
  constructor(
    @InjectRepository(Sintoma)
    private repository: Repository<Sintoma>,
    private animalService: AnimalService,
    private openAIService: OpenAIService,
  ) {}

  async create(createSintomaDto: CreateSintomaDto, usuarioId: number): Promise<Sintoma> {
    let animal;
    if ("id" in createSintomaDto.animal && !!createSintomaDto.animal.id) {
      animal = { id: createSintomaDto.animal.id };
    } else {
      animal = await this.animalService.create(createSintomaDto.animal as CreateAnimalDto, usuarioId);
    }

    const sintoma = await this.repository.create({
      ...createSintomaDto,
      animal,
    });

    sintoma.diagnostico = await this.openAIService.diagnosticarAnimal(sintoma);
    return this.repository.save(sintoma);
  }

  async findAll(page: number = 1, rpp: number = 10, options?: FindManyOptions<Sintoma>): Promise<Page<Sintoma>> {
    return findPaginated(this.repository, page, rpp, options);
  }

  async findOne(id: number, userId: number): Promise<Sintoma> {
    return this.repository.findOneBy({ id, animal: { usuario_id: userId } });
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }
}
