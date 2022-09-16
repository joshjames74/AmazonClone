import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
class Address {
    @PrimaryGeneratedColumn()
    address_id: number

    @ManyToOne(type => User)
    user: User

    @Column()
    name: string

    @Column()
    number: string

    @Column()
    postcode: string

    @Column()
    county: string
}

export {Address};