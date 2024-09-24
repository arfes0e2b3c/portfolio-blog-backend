import { OpenAPIHono, z } from "@hono/zod-openapi";
import { eq, sql } from "drizzle-orm";
import {
	fetchArticleListRoute,
	patchArticleRoute,
	postArticleRoute,
} from "../../openapi/article";
import { db } from "../db";
import { articlesTable } from "../schema";

const app = new OpenAPIHono();

app.openapi(fetchArticleListRoute, async (c) => {
	const allArticles = await db.select().from(articlesTable);
	return c.json({ contents: allArticles });
});

app.openapi(postArticleRoute, async (c) => {
	const body = c.req.valid("json");
	const result = await db.insert(articlesTable).values(body).$returningId();
	return c.json(result[0]);
});

app.openapi(patchArticleRoute, async (c) => {
	const body = c.req.valid("json");
	const { articleId } = c.req.valid("param");
	await db
		.update(articlesTable)
		.set({ updatedAt: sql`NOW()`, ...body })
		.where(eq(articlesTable.id, articleId));
	return c.json({ id: articleId });
});

export { app as articleApp };
