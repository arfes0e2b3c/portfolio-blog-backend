import { CategoryInputSchema } from '../../openapi/category'
import { domain } from '../domain'
import { repo } from '../repository'

class CategoryService {
	async getAll() {
		return await repo.category.getAll()
	}

	async create(body: CategoryInputSchema) {
		await domain.category.isUniqueName(body.name)
		return await repo.category.create(body)
	}

	async updateById(body: CategoryInputSchema, categoryId: string) {
		await domain.category.exists(categoryId)
		await domain.category.isUniqueName(body.name)
		return await repo.category.updateById(body, categoryId)
	}

	async deleteById(categoryId: string) {
		await domain.category.exists(categoryId)
		return await repo.category.deleteById(categoryId)
	}
}

export const categorySvc = new CategoryService()
