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
import pg from "pg";

export { Product, Address, Currency, Country, Review, User };

dotenv.config({ path: process.env.NODE_ENV === 'test' ? 'fnjnf' : '.env'});

let AppDataSource: DataSource;

AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGSQL_HOST || "localhost",
  port: parseInt(process.env.PGSQL_PORT || "5432"), 
  username: process.env.PGSQL_USER || "postgres",
  password: process.env.PGSQL_PASSWORD || "postgres",
  database: process.env.PGSQL_DATABASE || "amazon-clone",
  driver: pg,
  synchronize: true, 
  logging: false,
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

console.log(AppDataSource)

async function createConnection() {
  if (!AppDataSource || !AppDataSource.isInitialized) {
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
