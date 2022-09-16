import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Basket {
  @PrimaryGeneratedColumn()
  basket_id: number;

  @ManyToOne((type) => User, {eager: true})
  user: User;
}
