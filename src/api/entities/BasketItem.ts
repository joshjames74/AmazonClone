import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Address } from "./Address";
import { Product } from "./Product";
import { User } from "./User";
import { Currency } from "./Currency";
import { Basket } from "./Basket";

@Entity()
export class BasketItem {
    @PrimaryGeneratedColumn()
    item_id: number

    @OneToMany(type => Basket, (basket: Basket) => basket.basket_id)
    basket_id: number

    @ManyToOne(type => Product)
    product_id: number


    @Column()
    date_added: Date

    @Column()
    price: number

    @Column()
    quantity: number
}