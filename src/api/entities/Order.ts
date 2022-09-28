import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Address } from "./Address";
import { User } from "./User";
import { Currency } from "./Currency";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne((type) => User, { eager: true, onDelete: "SET NULL" })
  user: User;

  @Column()
  date: Date;

  @ManyToOne((type) => Currency, { eager: true, onDelete: "SET NULL" })
  currency: Currency;

  @ManyToOne((type) => Address, { eager: true, onDelete: "SET NULL" })
  address: Address;
}
