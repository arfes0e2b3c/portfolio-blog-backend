import { OpenAPIHono } from "@hono/zod-openapi";
import {
	deleteArticleRoute,
	fetchArticleListRoute,
	patchArticleRoute,
	postArticleRoute,
} from "../../openapi/article";
import { domain } from "../domain";
import {
	createArticle,
	deleteArticleById,
	getAllArticles,
	updateArticleById,
} from "../repository/article";
import { handleErrors } from "./error";

const app = new OpenAPIHono();

app.openapi(fetchArticleListRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const allArticles = await getAllArticles();
		return ctx.json({ contents: allArticles });
	}, c);
});

app.openapi(postArticleRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const body = ctx.req.valid("json");
		await domain.article.checkDuplicateTitle(body.title);
		await domain.category.checkExistCategory(body.category);
		const res = await createArticle(body);
		return ctx.json(res);
	}, c);
});

type x = keyof typeof postArticleRoute;

app.openapi(patchArticleRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const body = ctx.req.valid("json");
		const { articleId } = ctx.req.valid("param");
		await domain.article.checkExistArticle(articleId);
		await domain.article.checkDuplicateTitle(body.title);
		await domain.category.checkExistCategory(body.category);
		await updateArticleById(body, articleId);
		return ctx.json({ id: articleId });
	}, c);
});
app.openapi(deleteArticleRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const { articleId } = ctx.req.valid("param");
		await deleteArticleById(articleId);
		return ctx.json({});
	}, c);
});

export { app as articleApp };
