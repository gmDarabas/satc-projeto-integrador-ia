import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { SintomaService } from "../services/sintoma.service";
import { CreateSintomaDto } from "../dto/create-sintoma.dto";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";

@ApiTags("Sintomas")
@Controller({ path: "sintomas", version: "1" })
export class SintomaController {
  constructor(private readonly sintomaService: SintomaService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateSintomaDto, @Req() req: Request) {
    return this.sintomaService.create(createUsuarioDto, req.usuario.id);
  }

  @Get(":id")
  getOne(@Param("id") id: any, @Req() req: Request) {
    return this.sintomaService.findOne(+id, req.usuario.id);
  }

  @Get("animal/:animalId")
  findByAnimal(@Param("animalId") animalId: any) {
    return this.sintomaService.findByAnimal(+animalId);
  }
}
