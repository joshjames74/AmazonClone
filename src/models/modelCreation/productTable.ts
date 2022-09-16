import { CreateTableQueryType } from "./types/createTableQueryType";

export default function createProductTableQuery(
  props: CreateTableQueryType,
  sellerTable: string
): string {
  const query = `${props.createStatement} ${props.table} (
        id SERIAL PRIMARY KEY,
        sellerId SERIAL,
        shortName VARCHAR(255),
        fullName VARCHAR(255),
        description VARCHAR(255),
        price FLOAT,
        currencyCode VARCHAR(10),
        dateAdded TIMESTAMP,
        reviewCount INTEGER,
        reviewScore FLOAT,

        FOREIGN KEY (sellerId) REFERENCES ${sellerTable}(id)
    )`;

  return query;
}
