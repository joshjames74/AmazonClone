import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Country } from "./Country";
import { Currency } from "./Currency";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column({
        length: 100
    })
    first_name: string

    @Column({
        length: 100
    })
    user_name: string

    @Column()
    title: string

    @ManyToOne(type => Country, {
        eager: true
    })
    country: Country

    @ManyToOne(type => Currency)
    currency: Currency

    @Column()
    image_url: string
}