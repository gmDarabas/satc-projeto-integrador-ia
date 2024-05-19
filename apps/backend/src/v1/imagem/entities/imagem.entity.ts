import { CommonEntity } from "src/common/entities/common.entity";
import { Column, Entity } from "typeorm";

@Entity("imagens")
export class Imagem extends CommonEntity {
  @Column()
  filename: string;

  @Column({ type: "bytea" })
  data: Uint8Array;

  @Column()
  mimetype: string;

  getBase64() {
    if (!this.data) return null;

    const buffer = Buffer.from(this.data);
    const base64String = buffer.toString("base64");

    return `data:${this.mimetype};base64,${base64String}`;
  }
}
