import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from ".";

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  product_category_id: number;

  @ManyToOne((type) => Product, { eager: true, onDelete: "SET NULL" })
  product: Product;

  @Column()
  name: string;
}
export default {};
