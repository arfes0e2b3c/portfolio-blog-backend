import { HTTPException } from 'hono/http-exception'
import { repo } from '../repository'

const isUniqueTitle = async (title: string) => {
	const existingArticle = await repo.article.findByTitle(title)
	if (existingArticle.length > 0) {
		throw new HTTPException(400, {
			message: 'An article with the same title already exists',
		})
	}
}

const exists = async (articleId: string) => {
	const existingArticle = await repo.article.findById(articleId)
	if (existingArticle.length === 0) {
		throw new HTTPException(400, {
			message: 'The specified article does not exist',
		})
	}
}

export const article = {
	isUniqueTitle,
	exists,
}
