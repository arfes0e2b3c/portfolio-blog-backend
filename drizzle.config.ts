import { defineConfig } from "drizzle-kit";
export default defineConfig({
	dialect: "mysql",
	schema: "./src/schema.ts",
	out: "./drizzle",
	dbCredentials: {
		host: "localhost",
		user: "root",
		password: "password",
		database: "testdb",
	},
});
