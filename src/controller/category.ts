import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import {
	deleteCategoryRoute,
	fetchCategoryListRoute,
	patchCategoryRoute,
	postCategoryRoute,
} from "../../openapi/category";
import { checkDuplicateName } from "../domain/category";
import {
	createCategory,
	deleteCategoryById,
	getAllCategories,
	updateCategoryById,
} from "../repository/category";

const app = new OpenAPIHono();

app.openapi(fetchCategoryListRoute, async (c) => {
	try {
		const allCategories = await getAllCategories();
		return c.json({ contents: allCategories });
	} catch (error) {
		console.error("Database Error:", error);
		throw new HTTPException(500, { message: "Failed to fetch categories" });
	}
});

app.openapi(postCategoryRoute, async (c) => {
	try {
		const body = c.req.valid("json");
		await checkDuplicateName(body.name);
		const res = await createCategory(body);
		return c.json(res);
	} catch (error) {
		if (error instanceof HTTPException) {
			throw error;
		}
		console.error("Error in postCategoryRoute:", error);
		throw new HTTPException(500, {
			message: "An unexpected error occurred while posting the category",
		});
	}
});

app.openapi(patchCategoryRoute, async (c) => {
	const body = c.req.valid("json");
	const { categoryId } = c.req.valid("param");
	await updateCategoryById(body, categoryId);
	return c.json({ id: categoryId });
});

app.openapi(deleteCategoryRoute, async (c) => {
	const { categoryId } = c.req.valid("param");
	await deleteCategoryById(categoryId);
	return c.json({});
});

export { app as categoryApp };
