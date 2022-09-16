import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @ManyToOne((type) => Product, {eager: true})
  product: Product;

  @ManyToOne((type) => User, {eager: true})
  user: User;

  @Column()
  score: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  image_urls: string;

  @Column()
  date: Date;
}
