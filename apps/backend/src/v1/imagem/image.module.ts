import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Imagem } from "./entities/imagem.entity";
import { ImagemController } from "./controllers/imagem.controller";
import { ImagemService } from "./services/imagem.service";
import { OpenAIModule } from "src/common/services/openai/openai.module";

@Module({
  imports: [TypeOrmModule.forFeature([Imagem]), OpenAIModule],
  controllers: [ImagemController],
  providers: [ImagemService],
  exports: [ImagemService],
})
export class ImagemModule {}
