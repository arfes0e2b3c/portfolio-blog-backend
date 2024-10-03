import { ArticleInputSchema } from '../../openapi/article'
import { domain } from '../domain'
import { repo } from '../repository'

const getAll = async () => {
	return await repo.article.getAll()
}

const create = async (body: ArticleInputSchema) => {
	await domain.article.isUniqueTitle(body.title)
	await domain.category.exists(body.category)
	return await repo.article.create(body)
}

const updateById = async (body: ArticleInputSchema, articleId: string) => {
	await domain.article.exists(articleId)
	await domain.article.isUniqueTitle(body.title)
	await domain.category.exists(body.category)
	return await repo.article.updateById(body, articleId)
}

const deleteById = async (articleId: string) => {
	await domain.article.exists(articleId)
	return await repo.article.deleteById(articleId)
}

export const articleSvc = {
	getAll,
	create,
	updateById,
	deleteById,
}
