import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import {
	deleteArticleRoute,
	fetchArticleListRoute,
	patchArticleRoute,
	postArticleRoute,
} from "../../openapi/article";
import { checkDuplicateTitle } from "../domain/article";
import {
	createArticle,
	deleteArticleById,
	getAllArticles,
	updateArticleById,
} from "../repository/article";

const app = new OpenAPIHono();

app.openapi(fetchArticleListRoute, async (c) => {
	try {
		const allArticles = await getAllArticles();
		return c.json({ contents: allArticles });
	} catch (err) {
		console.error("Database Error:", err);
		throw new HTTPException(500, { message: "Failed to fetch articles" });
	}
});

app.openapi(postArticleRoute, async (c) => {
	try {
		const body = c.req.valid("json");
		checkDuplicateTitle(body.title);

		const res = await createArticle(body);
		return c.json(res);
	} catch (err) {
		if (err instanceof HTTPException) {
			throw err;
		}
		console.error("Error in postArticleRoute:", err);
		throw new HTTPException(500, {
			message: "An unexpected error occurred while posting the article",
		});
	}
});

app.openapi(patchArticleRoute, async (c) => {
	try {
		const body = c.req.valid("json");
		const { articleId } = c.req.valid("param");
		await updateArticleById(body, articleId);
		return c.json({ id: articleId });
	} catch (error) {
		console.error("Error in patchArticleRoute:", error);
		throw new HTTPException(500, {
			message: "An unexpected error occurred while patching the article	",
		});
	}
});

app.openapi(deleteArticleRoute, async (c) => {
	try {
		const { articleId } = c.req.valid("param");
		await deleteArticleById(articleId);
		return c.json({});
	} catch (error) {
		console.error("Error in deleteArticleRoute:", error);
		throw new HTTPException(500, {
			message: "An unexpected error occurred while deleting the article",
		});
	}
});

export { app as articleApp };
