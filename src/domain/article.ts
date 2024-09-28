import { HTTPException } from "hono/http-exception";
import { findArticleByTitle } from "../repository/article";

export const checkDuplicateTitle = async (title: string) => {
	const existingArticle = await findArticleByTitle(title);
	if (existingArticle.length > 0) {
		throw new HTTPException(400, {
			message: "An article with the same title already exists",
		});
	}
};
