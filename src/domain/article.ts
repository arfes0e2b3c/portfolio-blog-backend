import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { repo } from '../repository'

class ArticleDomain {
	async isUniqueTitle(c: Context, title: string) {
		const existingArticle = await repo.article.findByTitle(c, title)
		if (existingArticle.length > 0) {
			throw new HTTPException(400, {
				message: 'An article with the same title already exists',
			})
		}
	}

	async exists(c: Context, articleId: string) {
		const existingArticle = await repo.article.findById(c, articleId)
		if (existingArticle.length === 0) {
			throw new HTTPException(400, {
				message: 'The specified article does not exist',
			})
		}
	}
}

export const articleDomain = new ArticleDomain()
