import "reflect-metadata";

import { DataSource } from "typeorm";
import { Product } from './api/entities/Product';
import { Address } from './api/entities/Address';
import { Currency } from './api/entities/Currency';
import { Country } from './api/entities/Country';
import { Review } from './api/entities/Review';
import { User } from './api/entities/User';

export { Product, Address, Currency, Country, Review, User};

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "amazon-clone",
    synchronize: true,
    logging: false,
    entities: [Product, User, Country, Currency, Review, Address],
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
        .catch(error => console.log(error));
    }
}

//  AppDataSource.initialize()
// .then(() => {
//     // here you can start to work with your database
// })
// .catch((error) => console.log(error))

export { AppDataSource, createConnection };