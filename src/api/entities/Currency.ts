import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Currency {
  @PrimaryGeneratedColumn()
  currency_id: number;

  @Column()
  code: string;

  @Column()
  symbol: string;

  @Column("double precision", { nullable: true })
  gbp_exchange_rate: number;
}

export { Currency };
