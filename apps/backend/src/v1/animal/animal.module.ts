import { Module } from "@nestjs/common";
import { AnimalService } from "./services/animal.service";
import { Animal } from "./entities/animal.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalController } from "./controllers/animal.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimalController],
  providers: [AnimalService],
  exports: [AnimalService],
})
export class AnimalModule {}
