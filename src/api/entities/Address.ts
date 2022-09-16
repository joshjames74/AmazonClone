import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  address_id: number;

  @ManyToOne((type) => User, {eager: true})
  user: User;

  @Column()
  name: string;

  @Column()
  number: string;

  @Column()
  postcode: string;

  @Column()
  county: string;
}
