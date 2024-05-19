import { Module } from "@nestjs/common";
import { AnimalService } from "./services/animal.service";
import { Animal } from "./entities/animal.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalController } from "./controllers/animal.controller";
import { ImagemModule } from "../imagem/image.module";

@Module({
  imports: [TypeOrmModule.forFeature([Animal]), ImagemModule],
  controllers: [AnimalController],
  providers: [AnimalService],
  exports: [AnimalService],
})
export class AnimalModule {}
