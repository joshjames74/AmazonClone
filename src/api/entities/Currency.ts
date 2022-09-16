import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Currency {
    @PrimaryGeneratedColumn()
    currency_id: number

    @Column()
    code: string

    @Column()
    symbol: string
}

export { Currency }