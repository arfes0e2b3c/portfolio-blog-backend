import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";

const pool = mysql.createPool({
	host: "db",
	user: "root",
	password: "password",
	database: "testdb",
});

export const db = drizzle(pool);
