import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Basket {
    @PrimaryGeneratedColumn()
    basket_id: number

    @OneToMany(type => User, (user: User) => user.user_id)
    user_id: number
}