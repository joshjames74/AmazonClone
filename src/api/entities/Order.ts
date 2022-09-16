import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Address } from "./Address";
import { Product } from "./Product";
import { User } from "./User";
import { Currency } from "./Currency";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number

    @OneToMany(type => User, (user: User) => user.user_id)
    user_id: number

    @Column()
    date: Date

    @ManyToOne(type => Currency)
    currency_id: number

    @ManyToOne(type => Address)
    address_id: number
}