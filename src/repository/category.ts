import { sql } from 'drizzle-orm'
import type { CategoryInputSchema } from '../../openapi/category'
import { db } from '../db/db'
import { categoriesTable } from '../db/schema'

class CategoryRepository {
	async getAll() {
		return await db
			.select()
			.from(categoriesTable)
			.where(sql`${categoriesTable.deletedAt} IS NULL`)
	}

	async findByName(name: string) {
		return await db
			.select()
			.from(categoriesTable)
			.where(
				sql`${categoriesTable.name} = ${name} and ${categoriesTable.deletedAt} IS NULL`
			)
	}

	async findById(categoryId: string) {
		return await db
			.select()
			.from(categoriesTable)
			.where(
				sql`${categoriesTable.id} = ${categoryId} and ${categoriesTable.deletedAt} IS NULL`
			)
	}

	async create(body: CategoryInputSchema) {
		const res = await db
			.insert(categoriesTable)
			.values(body)
			.returning({ id: categoriesTable.id })
		return res[0]
	}

	async updateById(body: CategoryInputSchema, categoryId: string) {
		const res = await db
			.update(categoriesTable)
			.set({ updatedAt: sql`NOW()`, ...body })
			.where(
				sql`${categoriesTable.id} = ${categoryId} and ${categoriesTable.deletedAt} IS NULL`
			)
			.returning({ id: categoriesTable.id })
		return res[0]
	}

	async deleteById(categoryId: string) {
		const res = await db
			.update(categoriesTable)
			.set({ deletedAt: sql`NOW()`, updatedAt: sql`NOW()` })
			.where(
				sql`${categoriesTable.id} = ${categoryId} and ${categoriesTable.deletedAt} IS NULL`
			)
			.returning({ id: categoriesTable.id })
		return res[0]
	}
}

export const categoryRepo = new CategoryRepository()
