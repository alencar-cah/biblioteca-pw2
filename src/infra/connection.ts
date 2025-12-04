import { Pool } from "pg";

export const connection = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'biblioteca-bd'
});