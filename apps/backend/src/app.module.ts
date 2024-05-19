import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./v1/usuario/entities/usuario.entity";

import { UsuarioModule } from "./v1/usuario/usuario.module";
import { AuthModule } from "./v1/auth/auth.module";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AnimalModule } from "./v1/animal/animal.module";
import { SintomaModule } from "./v1/sintoma/sintoma.module";
import { Animal } from "./v1/animal/entities/animal.entity";
import { Sintoma } from "./v1/sintoma/entities/sintoma.entity";
import { ImagemModule } from "./v1/imagem/image.module";
import { Imagem } from "./v1/imagem/entities/imagem.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          host: configService.get("DATABASE_HOST"),
          port: configService.get<number>("DATABASE_PORT"),
          username: configService.get("DATABASE_USER"),
          password: configService.get("DATABASE_PASSWORD"),
          database: configService.get("DATABASE_NAME"),
          entities: [Usuario, Animal, Sintoma, Imagem],
          synchronize: true,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsuarioModule,
    AnimalModule,
    SintomaModule,
    ImagemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
