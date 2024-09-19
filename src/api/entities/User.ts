import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Country } from "./Country";
import { Currency } from "./Currency";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  user_name: string;

  @Column({ length: 200, nullable: true })
  sub: string

  @Column({ nullable: true })
  title: string;

  @ManyToOne((type) => Country, { eager: true, onDelete: "SET NULL" })
  country: Country;

  @ManyToOne((type) => Currency, { eager: true, onDelete: "SET NULL" })
  currency: Currency;

  @Column()
  image_url: string;
}
