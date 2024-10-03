import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import {
	deleteCategoryRoute,
	fetchCategoryListRoute,
	patchCategoryRoute,
	postCategoryRoute,
} from "../../openapi/category";
import { domain } from "../domain";
import {
	createCategory,
	deleteCategoryById,
	getAllCategories,
	updateCategoryById,
} from "../repository/category";
import { handleErrors } from "./error";

const app = new OpenAPIHono();

app.openapi(fetchCategoryListRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const allCategories = await getAllCategories();
		return ctx.json({ contents: allCategories });
	}, c);
});

app.openapi(postCategoryRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const body = ctx.req.valid("json");
		await domain.category.checkDuplicateName(body.name);
		const res = await createCategory(body);
		return ctx.json(res);
	}, c);
});

app.openapi(patchCategoryRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const body = ctx.req.valid("json");
		const { categoryId } = ctx.req.valid("param");
		await updateCategoryById(body, categoryId);
		return ctx.json({ id: categoryId });
	}, c);
});

app.openapi(deleteCategoryRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const { categoryId } = ctx.req.valid("param");
		await deleteCategoryById(categoryId);
		return ctx.json({});
	}, c);
});

export { app as categoryApp };
