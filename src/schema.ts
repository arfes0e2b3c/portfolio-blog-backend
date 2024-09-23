import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: varchar("id", { length: 20 }).primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
});
