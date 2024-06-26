import { CommonEntity } from "src/common/entities/common.entity";
import { Imagem } from "src/v1/imagem/entities/imagem.entity";
import { Usuario } from "src/v1/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

export enum Especie {
  Cachorro = "Cachorro",
  Gato = "Gato",
  Coelho = "Coelho",
  Hamster = "Hamster",
}

@Entity("animais")
export class Animal extends CommonEntity {
  @Column({ enum: Especie })
  especie: Especie;

  @Column()
  raca: string;

  @Column({ type: "int" })
  idade: number;

  @Column({ type: "float" })
  peso: number;

  @Column()
  nome: string;

  @ManyToOne(() => Usuario)
  usuario: Usuario;

  @Column()
  usuario_id: number;

  @JoinColumn()
  @OneToOne(() => Imagem, { nullable: true })
  imagem?: Imagem;

  @Column({ nullable: true })
  imagem_id?: number;
}
