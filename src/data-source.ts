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
  ProductCategory,
  ProductType,
  Basket,
  BasketItem,
} from "./api/entities";
import { BasketView } from "./api/entities/BasketView";
import { OrderView } from "./api/entities/OrderView";

export { Product, Address, Currency, Country, Review, User };

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "postgres",
  database: "amazon-clone",
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
    ProductCategory,
    ProductType,
    Order,
    OrderItem,
    Basket,
    BasketItem,
    BasketView,
    //OrderView
  ],
  // entities: [
  //     "src/**/*/entities/*{.js,.ts}"
  // ],
  // entities: [
  //     "src/api/entities/*.ts"
  // ],
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

export { AppDataSource, createConnection };
