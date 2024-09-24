import { OpenAPIHono, z } from "@hono/zod-openapi";
import { eq, sql } from "drizzle-orm";
import {
	deleteCategoryRoute,
	fetchCategoryListRoute,
	patchCategoryRoute,
	postCategoryRoute,
} from "../../openapi/category";
import { db } from "../db";
import { categoriesTable } from "../schema";

const app = new OpenAPIHono();

app.openapi(fetchCategoryListRoute, async (c) => {
	const allCategories = await db
		.select()
		.from(categoriesTable)
		.where(sql`${categoriesTable.deletedAt} IS NULL`);
	return c.json({ contents: allCategories });
});

app.openapi(postCategoryRoute, async (c) => {
	const body = c.req.valid("json");
	const result = await db.insert(categoriesTable).values(body).$returningId();
	return c.json(result[0]);
});

app.openapi(patchCategoryRoute, async (c) => {
	const body = c.req.valid("json");
	const { categoryId } = c.req.valid("param");
	await db
		.update(categoriesTable)
		.set({ updatedAt: sql`NOW()`, ...body })
		.where(eq(categoriesTable.id, categoryId));
	return c.json({ id: categoryId });
});

app.openapi(deleteCategoryRoute, async (c) => {
	const { categoryId } = c.req.valid("param");
	await db
		.update(categoriesTable)
		.set({ deletedAt: sql`NOW()` })
		.where(eq(categoriesTable.id, categoryId));
	return c.json({});
});

export { app as categoryApp };
