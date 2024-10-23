import { Context } from 'hono'
import { CategoryInputSchema } from '../../openapi/category'
import { domain } from '../domain'
import { repo } from '../repository'

class CategoryService {
	async getAll(c: Context) {
		return await repo.category.getAll(c)
	}

	async create(c: Context, body: CategoryInputSchema) {
		await domain.category.isUniqueName(c, body.name)
		return await repo.category.create(c, body)
	}

	async updateById(c: Context, body: CategoryInputSchema, categoryId: string) {
		await domain.category.exists(c, categoryId)
		await domain.category.isUniqueName(c, body.name)
		return await repo.category.updateById(c, body, categoryId)
	}

	async deleteById(c: Context, categoryId: string) {
		await domain.category.exists(c, categoryId)
		return await repo.category.deleteById(c, categoryId)
	}
}

export const categorySvc = new CategoryService()
