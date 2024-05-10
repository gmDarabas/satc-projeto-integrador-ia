import { Module } from "@nestjs/common";
import { SintomaService } from "./services/sintoma.service";
import { SintomaController } from "./controllers/sintoma.controller";
import { AnimalModule } from "../animal/animal.module";
import { Sintoma } from "./entities/sintoma.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Sintoma]), AnimalModule],
  controllers: [SintomaController],
  providers: [SintomaService],
})
export class SintomaModule {}
