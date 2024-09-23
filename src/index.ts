import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { route } from "../openapi";
import { db } from "./db";
import { users } from "./schema";

const app = new OpenAPIHono();

app
	.openapi(route, async (c) => {
		const allUsers = await db.select().from(users);
		return c.json(allUsers);
	})
	.doc31("/doc", {
		openapi: "3.1.0",
		info: {
			title: "api",
			version: "1.0.0",
		},
	})
	.get(
		"/ui",
		swaggerUI({
			url: "/doc",
		}),
	);

export default app;
