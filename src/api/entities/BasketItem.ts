import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Product } from "./Product";
import { Basket } from "./Basket";

@Entity()
export class BasketItem {
  @PrimaryGeneratedColumn()
  item_id: number;

  @ManyToOne((type) => Basket, {eager: true})
  basket: Basket;

  @ManyToOne((type) => Product, {eager: true})
  product: Product;

  @Column()
  date_added: Date;

  @Column()
  price: number;

  @Column()
  quantity: number;
}
