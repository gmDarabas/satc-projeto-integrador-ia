import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImagemService } from "../services/imagem.service";
import { Response } from "express";
import { OpenAIService } from "src/common/services/openai/openai.service";

@ApiTags("Imagens")
@Controller({ path: "imagens", version: "1" })
export class ImagemController {
  constructor(
    private readonly imagemService: ImagemService,
    private readonly openAIService: OpenAIService,
  ) {}

  @Get(":id")
  async getImagem(@Param("id") id: string, @Res() res: Response) {
    const imagem = await this.imagemService.findById(+id);
    if (!imagem) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.setHeader("Content-Type", "image/jpeg"); // ou outro tipo de imagem
    res.send(imagem.data);
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(@UploadedFile() file: Express.Multer.File) {
    const imagem = await this.imagemService.create(file.buffer, file.originalname, file.mimetype);
    let predicao = undefined;
    try {
      predicao = await this.openAIService.identificarAnimal(imagem);
    } catch (e) {}
    return { imagem, predicao };
  }
}
