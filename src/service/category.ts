import { CategoryInputSchema } from '../../openapi/category'
import { domain } from '../domain'
import { repo } from '../repository'

const getAll = async () => {
	return await repo.category.getAll()
}

const create = async (body: CategoryInputSchema) => {
	await domain.category.isUniqueName(body.name)
	return await repo.category.create(body)
}

const updateById = async (body: CategoryInputSchema, categoryId: string) => {
	await domain.category.exists(categoryId)
	await domain.category.isUniqueName(body.name)
	return await repo.category.updateById(body, categoryId)
}

const deleteById = async (categoryId: string) => {
	await domain.category.exists(categoryId)
	return await repo.category.deleteById(categoryId)
}

export const categorySvc = {
	getAll,
	create,
	updateById,
	deleteById,
}
