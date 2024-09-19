import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn()
  product_type_id: number;

  @Column()
  name: string;
}
