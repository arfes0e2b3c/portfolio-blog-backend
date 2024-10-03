import { ArticleInputSchema } from '../../openapi/article'
import { domain } from '../domain'
import { repo } from '../repository'

class ArticleService {
	async getAll() {
		return await repo.article.getAll()
	}

	async create(body: ArticleInputSchema) {
		await domain.article.isUniqueTitle(body.title)
		await domain.article.exists(body.category)
		return await repo.article.create(body)
	}

	async updateById(body: ArticleInputSchema, articleId: string) {
		await domain.article.exists(articleId)
		await domain.article.isUniqueTitle(body.title)
		await domain.category.exists(body.category)
		return await repo.article.updateById(body, articleId)
	}

	async deleteById(articleId: string) {
		await domain.article.exists(articleId)
		return await repo.article.deleteById(articleId)
	}
}

export const articleSvc = new ArticleService()
