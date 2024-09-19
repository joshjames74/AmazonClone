import "reflect-metadata";

import { DataSource } from "typeorm";
import {
  Product,
  Address,
  Currency,
  Country,
  Review,
  User,
  Category,
  Order,
  OrderItem,
  ProductType,
  Basket,
  BasketItem,
} from "./api/entities";
import { BasketView } from "./api/entities/BasketView";
import { OrderView } from "./api/entities/OrderView";
import dotenv from 'dotenv'

export { Product, Address, Currency, Country, Review, User };

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'})


const AppDataSource = new DataSource({
  type: process.env.PGSQL_TYPE,
  host: process.env.PGSQL_HOST,
  port: process.env.PGSQL_PORT,
  username: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
  database: process.env.PGSQL_DATABASE,
  synchronize: process.env.PGSQL_SYNCHRONIZE === 'true',
  logging: process.env.PGSQL_LOGGING === 'true',
  entities: [
    Product,
    User,
    Country,
    Currency,
    Review,
    Address,
    Category,
    ProductType,
    Order,
    OrderItem,
    Basket,
    BasketItem,
    BasketView,
    OrderView,
  ],
  migrations: [],
  subscribers: [],
});

async function createConnection() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
      .then(() => {})
      .catch((error) => console.log(error));
  }
}

async function closeConnection() {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy()
      .then(() => {})
      .catch((error) => console.log(error))
  }
}

export { AppDataSource, createConnection, closeConnection };
