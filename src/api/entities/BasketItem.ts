import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Basket } from "./Basket";

@Entity()
export class BasketItem {
  @PrimaryGeneratedColumn()
  item_id: number;

  @ManyToOne((type) => Basket, { eager: true, onDelete: "SET NULL" })
  basket: Basket;

  @ManyToOne((type) => Product, { eager: true, onDelete: "SET NULL" })
  product: Product;

  @Column()
  date_added: Date;

  @Column()
  quantity: number;
}
