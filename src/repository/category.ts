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
		.where(
			sql`${categoriesTable.name} = ${name} and ${categoriesTable.deletedAt} IS NULL`
		)
}

const findById = async (categoryId: string) => {
	return await db
		.select()
		.from(categoriesTable)
		.where(
			sql`${categoriesTable.id} = ${categoryId} and ${categoriesTable.deletedAt} IS NULL`
		)
}

const create = async (body: CategoryInputSchema) => {
	const res = await db
		.insert(categoriesTable)
		.values(body)
		.returning({ id: categoriesTable.id })
	return res[0]
}

const updateById = async (body: CategoryInputSchema, categoryId: string) => {
	const res = await db
		.update(categoriesTable)
		.set({ updatedAt: sql`NOW()`, ...body })
		.where(
			sql`${categoriesTable.id} = ${categoryId} and ${categoriesTable.deletedAt} IS NULL`
		)
		.returning({ id: categoriesTable.id })
	return res[0]
}

const deleteById = async (categoryId: string) => {
	const res = await db
		.update(categoriesTable)
		.set({ deletedAt: sql`NOW()`, updatedAt: sql`NOW()` })
		.where(
			sql`${categoriesTable.id} = ${categoryId} and ${categoriesTable.deletedAt} IS NULL`
		)
		.returning({ id: categoriesTable.id })
	return res[0]
}

export const categoryRepo = {
	getAll,
	findByName,
	findById,
	create,
	updateById,
	deleteById,
}
