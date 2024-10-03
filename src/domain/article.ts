import { HTTPException } from "hono/http-exception";
import { findArticleById, findArticleByTitle } from "../repository/article";

const isUniqueTitle = async (title: string) => {
	const existingArticle = await findArticleByTitle(title);
	if (existingArticle.length > 0) {
		throw new HTTPException(400, {
			message: "An article with the same title already exists",
		});
	}
};

const exists = async (articleId: string) => {
	const existingArticle = await findArticleById(articleId);
	if (existingArticle.length === 0) {
		throw new HTTPException(400, {
			message: "The specified article does not exist",
		});
	}
};

export const article = {
	isUniqueTitle,
	exists,
};
