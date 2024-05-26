import { CommonEntity } from "src/common/entities/common.entity";
import { Animal } from "src/v1/animal/entities/animal.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity("sintomas")
export class Sintoma extends CommonEntity {
  @ManyToOne(() => Animal)
  animal: Animal;

  @Column()
  animal_id: number;

  @Column()
  descricao: string;

  @Column()
  diagnostico: string;
}
