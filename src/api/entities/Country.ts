import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Country {
  @PrimaryGeneratedColumn()
  country_id: number;

  @Column()
  code: string;

  @Column()
  name: string;
}

export { Country };
