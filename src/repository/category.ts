import { eq, sql } from 'drizzle-orm'
import type { CategoryInputSchema } from '../../openapi/category'
import { db } from '../db'
import { categoriesTable } from '../schema'

export const getAllCategories = async () => {
	return await db
		.select()
		.from(categoriesTable)
		.where(sql`${categoriesTable.deletedAt} IS NULL`)
}

export const findCategoryByName = async (name: string) => {
	return await db
		.select()
		.from(categoriesTable)
		.where(eq(categoriesTable.name, name))
}

export const findCategoryById = async (categoryId: string) => {
	return await db
		.select()
		.from(categoriesTable)
		.where(eq(categoriesTable.id, categoryId))
}

export const createCategory = async (body: CategoryInputSchema) => {
	const res = await db.insert(categoriesTable).values(body).$returningId()
	return res[0]
}

export const updateCategoryById = async (
	body: CategoryInputSchema,
	categoryId: string
) => {
	return await db
		.update(categoriesTable)
		.set({ updatedAt: sql`NOW()`, ...body })
		.where(eq(categoriesTable.id, categoryId))
}

export const deleteCategoryById = async (categoryId: string) => {
	return await db
		.update(categoriesTable)
		.set({ deletedAt: sql`NOW()`, updatedAt: sql`NOW()` })
		.where(eq(categoriesTable.id, categoryId))
}
