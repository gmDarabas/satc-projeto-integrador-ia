import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Imagem } from "../entities/imagem.entity";

@Injectable()
export class ImagemService {
  constructor(
    @InjectRepository(Imagem)
    private repository: Repository<Imagem>,
  ) {}

  async create(imageBuffer: Buffer, filename: string, mimetype: string): Promise<Imagem> {
    const newFile = await this.repository.create({
      filename,
      mimetype,
      data: imageBuffer,
    });
    await this.repository.save(newFile);
    return newFile;
  }

  async findById(id: number): Promise<Imagem> {
    return this.repository.findOneBy({ id });
  }
}
