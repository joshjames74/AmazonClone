import { CreateTableQueryType } from "./types/createTableQueryType";

export default function createCustomerTableQuery(
  props: CreateTableQueryType,
  userTable: string
): string {
  const query = `${props.createStatement} ${props.table} (
        id SERIAL PRIMARY KEY,
        userId SERIAL,
        firstName VARCHAR(255),
        fullName VARCHAR(255),
        DOB TIMESTAMP,

        FOREIGN KEY (userId) REFERENCES ${userTable}(id)
    )`;

  return query;
}
