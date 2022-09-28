import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Country } from "./Country";
import { User } from "./User";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  address_id: number;

  @ManyToOne((type) => User, { eager: true })
  user: User;

  @Column()
  name: string;

  @Column()
  number: string;

  @Column()
  street_name: string;

  @Column()
  postcode: string;

  @Column()
  county: string;

  @ManyToOne((type) => Country, {onDelete: "SET NULL"})
  country: Country;
}
