import { sql } from 'drizzle-orm'
import { Context } from 'hono'
import type { CategoryInputSchema } from '../../openapi/category'
import { withDbConnection } from '../db'
import { categoriesTable } from '../db/schema'

class CategoryRepository {
	async getAll(c: Context) {
		return withDbConnection(c, async (db) => {
			return await db
				.select()
				.from(categoriesTable)
				.where(sql`${categoriesTable.deletedAt} IS NULL`)
		})
	}

	async findByName(c: Context, name: string) {
		return withDbConnection(c, async (db) => {
			return await db
				.select()
				.from(categoriesTable)
				.where(
					sql`${categoriesTable.name} = ${name} and ${categoriesTable.deletedAt} IS NULL`
				)
		})
	}

	async findById(c: Context, categoryId: string) {
		return withDbConnection(c, async (db) => {
			return await db
				.select()
				.from(categoriesTable)
				.where(
					sql`${categoriesTable.id} = ${categoryId} and ${categoriesTable.deletedAt} IS NULL`
				)
		})
	}

	async create(c: Context, body: CategoryInputSchema) {
		return withDbConnection(c, async (db) => {
			const res = await db
				.insert(categoriesTable)
				.values(body)
				.returning({ id: categoriesTable.id })
			return res[0]
		})
	}

	async updateById(c: Context, body: CategoryInputSchema, categoryId: string) {
		return withDbConnection(c, async (db) => {
			const res = await db
				.update(categoriesTable)
				.set({ updatedAt: sql`NOW()`, ...body })
				.where(
					sql`${categoriesTable.id} = ${categoryId} and ${categoriesTable.deletedAt} IS NULL`
				)
				.returning({ id: categoriesTable.id })
			return res[0]
		})
	}

	async deleteById(c: Context, categoryId: string) {
		return withDbConnection(c, async (db) => {
			const res = await db
				.update(categoriesTable)
				.set({ deletedAt: sql`NOW()`, updatedAt: sql`NOW()` })
				.where(
					sql`${categoriesTable.id} = ${categoryId} and ${categoriesTable.deletedAt} IS NULL`
				)
				.returning({ id: categoriesTable.id })
			return res[0]
		})
	}
}

export const categoryRepo = new CategoryRepository()
