import { HTTPException } from 'hono/http-exception'
import { repo } from '../repository'

class CategoryDomain {
	async isUniqueName(name: string) {
		const existingCategory = await repo.category.findByName(name)
		if (existingCategory.length > 0) {
			throw new HTTPException(400, {
				message: 'A category with the same name already exists',
			})
		}
	}

	async exists(categoryId: string) {
		const existingCategory = await repo.category.findById(categoryId)
		if (existingCategory.length === 0) {
			throw new HTTPException(400, {
				message: 'The specified category does not exist',
			})
		}
	}
}

export const categoryDomain = new CategoryDomain()
