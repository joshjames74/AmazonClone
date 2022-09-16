import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  order_item_id: number;

  @ManyToOne((type) => Order, {eager: true})
  order: Order;

  @ManyToOne((type) => Product, {eager: true})
  product: Product;

  @Column()
  price: number;

  @Column()
  quantity: number;
}
