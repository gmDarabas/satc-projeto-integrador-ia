import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { findPaginated } from "src/common/utils";
import { Page } from "src/types/interfaces";
import { FindManyOptions, Repository, UpdateResult } from "typeorm";
import { CreateAnimalDto } from "../dto/create-animal.dto";
import { Animal } from "../entities/animal.entity";
import { UpdateAnimalDto } from "../dto/update-animal.dto";

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private repository: Repository<Animal>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto, usuarioId: number): Promise<Animal> {
    return this.repository.save({ ...createAnimalDto, usuario_id: usuarioId });
  }

  async findAll(page: number = 1, rpp: number = 10, options?: FindManyOptions<Animal>): Promise<Page<Animal>> {
    return findPaginated(this.repository, page, rpp, options);
  }

  async findByUser(userId: number): Promise<Array<Animal>> {
    return this.repository.find({ where: { usuario_id: userId }, relations: ["imagem"] });
  }

  async findOne(id: number, usuarioId: number): Promise<Animal> {
    return this.repository.findOneBy({ id, usuario_id: usuarioId });
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto): Promise<UpdateResult> {
    return this.repository.update({ id }, updateAnimalDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }
}
