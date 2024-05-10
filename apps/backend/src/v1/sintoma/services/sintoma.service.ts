import { Injectable } from "@nestjs/common";
import { CreateSintomaDto } from "../dto/create-sintoma.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { findPaginated } from "src/common/utils";
import { Page } from "src/types/interfaces";
import { Repository, FindManyOptions, UpdateResult } from "typeorm";
import { Sintoma } from "../entities/sintoma.entity";
import { AnimalService } from "src/v1/animal/services/animal.service";
import { CreateAnimalDto } from "src/v1/animal/dto/create-animal.dto";

@Injectable()
export class SintomaService {
  constructor(
    @InjectRepository(Sintoma)
    private repository: Repository<Sintoma>,
    private animalService: AnimalService,
  ) {}

  async create(createSintomaDto: CreateSintomaDto, usuarioId: number): Promise<Sintoma> {
    let animalId;
    if ("id" in createSintomaDto.animal && !!createSintomaDto.animal.id) {
      animalId = createSintomaDto.animal.id;
    } else {
      const animal = await this.animalService.create(createSintomaDto.animal as CreateAnimalDto, usuarioId);
      animalId = animal.id;
    }

    const diagnostico =
      "Mussum Ipsum, cacilds vidis litro abertis. Nulla id gravida magna, ut semper sapien. Sapien in monti palavris qui num significa nadis i pareci latim. In elementis mé pra quem é amistosis quis leo. Negão é teu passadis, eu sou faxa pretis"; // usar service para fazer consulta
    return this.repository.save({
      ...createSintomaDto,
      animal: { id: animalId },
      diagnostico,
    });
  }

  async findAll(page: number = 1, rpp: number = 10, options?: FindManyOptions<Sintoma>): Promise<Page<Sintoma>> {
    return findPaginated(this.repository, page, rpp, options);
  }

  async findOne(id: number, userId: number): Promise<Sintoma> {
    return this.repository.findOneBy({ id, animal: { usuario_id: userId } });
  }

  //   async update(id: number, updateAnimalDto: UpdateAnimalDto): Promise<UpdateResult> {
  //     return this.repository.update({ id }, updateAnimalDto);
  //   }

  async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }
}
