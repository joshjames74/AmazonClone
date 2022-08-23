import { Pool } from 'pg';

let conn: any;

if (!conn) {
    conn = new Pool({
        user: process.env.PGSQL_USER,
        password: process.env.PGSQL_PASSWORD,
        host: process.env.PGSQL_HOST,
        port: 5433,
        database: process.env.PGSQL_DATABASE
    })
}

export default conn;