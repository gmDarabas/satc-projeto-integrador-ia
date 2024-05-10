import { Controller, Get, Param, Req } from "@nestjs/common";
import { AnimalService } from "../services/animal.service";
import { Request } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Animais")
@Controller({ path: "animais", version: "1" })
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  findByUser(@Req() req: Request) {
    return this.animalService.findByUser(req.usuario.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Req() req: Request) {
    return this.animalService.findOne(+id, req.usuario.id);
  }
}
