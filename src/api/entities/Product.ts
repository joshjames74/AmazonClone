import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Category } from ".";
import { Currency } from "./Currency";
import { User } from "./User";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @ManyToOne(() => User, { eager: true, onDelete: "SET NULL" })
  seller: User;

  @Column({ length: 100 })
  title: string;

  @Column({ nullable: true })
  url: string;

  @Column("text")
  description: string;

  @Column({
    default:
      "https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg",
  })
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

  @Column("bigint", {
    default: 0,
  })
  order_count: number;

  @Column("integer", { nullable: true, array: true })
  category_ids: number[];
}
