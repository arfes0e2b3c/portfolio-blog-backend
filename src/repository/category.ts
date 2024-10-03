import { eq, sql } from 'drizzle-orm'
import type { CategoryInputSchema } from '../../openapi/category'
import { db } from '../db/db'
import { categoriesTable } from '../db/schema'

const getAll = async () => {
	return await db
		.select()
		.from(categoriesTable)
		.where(sql`${categoriesTable.deletedAt} IS NULL`)
}

const findByName = async (name: string) => {
	return await db
		.select()
		.from(categoriesTable)
		.where(eq(categoriesTable.name, name))
}

const findById = async (categoryId: string) => {
	return await db
		.select()
		.from(categoriesTable)
		.where(eq(categoriesTable.id, categoryId))
}

const create = async (body: CategoryInputSchema) => {
	const res = await db.insert(categoriesTable).values(body).$returningId()
	return res[0]
}

const updateById = async (body: CategoryInputSchema, categoryId: string) => {
	return await db
		.update(categoriesTable)
		.set({ updatedAt: sql`NOW()`, ...body })
		.where(eq(categoriesTable.id, categoryId))
}

const deleteById = async (categoryId: string) => {
	return await db
		.update(categoriesTable)
		.set({ deletedAt: sql`NOW()`, updatedAt: sql`NOW()` })
		.where(eq(categoriesTable.id, categoryId))
}

export const categoryRepo = {
	getAll,
	findByName,
	findById,
	create,
	updateById,
	deleteById,
}
