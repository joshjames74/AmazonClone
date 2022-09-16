import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    review_id: number

    @ManyToOne(type => Product)
    product_id: number
    
    @ManyToOne(type => User)@JoinColumn()
    user_id: number

    @Column()
    score: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    image_urls: string

    @Column()
    date: Date
}