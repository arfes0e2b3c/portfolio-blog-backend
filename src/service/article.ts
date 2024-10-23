import { Context } from 'hono'
import { ArticleInputSchema } from '../../openapi/article'
import { domain } from '../domain'
import { repo } from '../repository'

class ArticleService {
	async getAll(c: Context) {
		return await repo.article.getAll(c)
	}

	async create(c: Context, body: ArticleInputSchema) {
		await domain.article.isUniqueTitle(c, body.title)
		await domain.article.exists(c, body.category)
		return await repo.article.create(c, body)
	}

	async updateById(c: Context, body: ArticleInputSchema, articleId: string) {
		await domain.article.exists(c, articleId)
		await domain.article.isUniqueTitle(c, body.title)
		await domain.category.exists(c, body.category)
		return await repo.article.updateById(c, body, articleId)
	}

	async deleteById(c: Context, articleId: string) {
		await domain.article.exists(c, articleId)
		return await repo.article.deleteById(c, articleId)
	}
}

export const articleSvc = new ArticleService()
