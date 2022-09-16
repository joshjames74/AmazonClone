import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";
import { Order } from "./Order";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    order_item_id: number

    @ManyToOne(type => Order)
    order_id: number

    @ManyToOne(type => Product)
    product_id: number

    @Column()
    price: number

    @Column()
    quantity: number
}