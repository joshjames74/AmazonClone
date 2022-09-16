import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Address } from "./Address";
import { User } from "./User";
import { Currency } from "./Currency";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne((type) => User, {eager: true})
  user: User;

  @Column()
  date: Date;

  @ManyToOne((type) => Currency, {eager: true})
  currency: Currency;

  @ManyToOne((type) => Address, {eager: true})
  address: Address;
}
