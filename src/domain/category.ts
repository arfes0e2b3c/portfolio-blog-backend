import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { repo } from '../repository'

class CategoryDomain {
	async isUniqueName(c: Context, name: string) {
		const existingCategory = await repo.category.findByName(c, name)
		if (existingCategory.length > 0) {
			throw new HTTPException(400, {
				message: 'A category with the same name already exists',
			})
		}
	}

	async exists(c: Context, categoryId: string) {
		const existingCategory = await repo.category.findById(c, categoryId)
		if (existingCategory.length === 0) {
			throw new HTTPException(400, {
				message: 'The specified category does not exist',
			})
		}
	}
}

export const categoryDomain = new CategoryDomain()
