import { CreateTableQueryType } from "./types/createTableQueryType";

export default function createUserTableQuery(props: CreateTableQueryType) {
    const query = `${props.createStatement} ${props.table} (
        id SERIAL PRIMARY KEY,
        type VARCHAR(255)
    )`;

    return query;
}