import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { articleApp } from "./article";

const app = new OpenAPIHono();

app.route("/");
app.route("/articles", articleApp);

app.doc31("/doc", {
	openapi: "3.1.0",
	info: {
		title: "api",
		version: "1.0.0",
	},
});

app.get(
	"/ui",
	swaggerUI({
		url: "/doc",
	}),
);

export default app;
