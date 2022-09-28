import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Currency } from "./Currency";
import { User } from "./User";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @ManyToOne((type) => User, { eager: true, onDelete: "SET NULL" })
  seller: User;

  @Column({ length: 100 })
  title: string;

  @Column({ nullable: true })
  url: string;

  @Column("text")
  description: string;

  @Column({ default: 'https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg' })
  image_url: string;

  @Column({
    length: 100,
  })
  image_alt: string;

  @Column("double precision")
  price: number;

  @ManyToOne((type) => Currency, { eager: true, onDelete: "SET NULL" })
  currency: Currency;

  @Column("double precision", {
    default: 0,
  })
  review_score: number;

  @Column("bigint", {
    default: 0,
  })
  review_count: number;
}
