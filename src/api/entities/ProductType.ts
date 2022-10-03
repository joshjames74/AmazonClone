import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Product } from ".";

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn()
  product_type_id: number;

  @Column()
  name: string;
}
