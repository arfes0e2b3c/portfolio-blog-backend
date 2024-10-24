import { sql } from 'drizzle-orm'
import { Context } from 'hono'
import type { ArticleInputSchema } from '../../openapi/article'
import { withDbConnection } from '../db'
import { articlesTable } from '../db/schema'

class ArticleRepository {
	async getAll(c: Context) {
		return withDbConnection(c, async (db) => {
			return await db
				.select()
				.from(articlesTable)
				.where(sql`${articlesTable.deletedAt} IS NULL`)
		})
	}

	async findByTitle(c: Context, title: string) {
		return withDbConnection(c, async (db) => {
			return await db
				.select()
				.from(articlesTable)
				.where(
					sql`${articlesTable.title} = ${title} and ${articlesTable.deletedAt} IS NULL`
				)
		})
	}

	async findById(c: Context, articleId: string) {
		return withDbConnection(c, async (db) => {
			const res = await db
				.select()
				.from(articlesTable)
				.where(
					sql`${articlesTable.id} = ${articleId} and ${articlesTable.deletedAt} IS NULL`
				)
			return res[0]
		})
	}

	async create(c: Context, body: ArticleInputSchema) {
		return withDbConnection(c, async (db) => {
			const res = await db
				.insert(articlesTable)
				.values(body)
				.returning({ id: articlesTable.id })
			return res[0]
		})
	}

	async updateById(c: Context, body: ArticleInputSchema, articleId: string) {
		return withDbConnection(c, async (db) => {
			const res = await db
				.update(articlesTable)
				.set({ updatedAt: sql`NOW()`, ...body })
				.where(
					sql`${articlesTable.id} = ${articleId} and ${articlesTable.deletedAt} IS NULL`
				)
				.returning({ id: articlesTable.id })
			return res[0]
		})
	}

	async deleteById(c: Context, articleId: string) {
		return withDbConnection(c, async (db) => {
			const res = await db
				.update(articlesTable)
				.set({ deletedAt: sql`NOW()`, updatedAt: sql`NOW()` })
				.where(
					sql`${articlesTable.id} = ${articleId} and ${articlesTable.deletedAt} IS NULL`
				)
				.returning({ id: articlesTable.id })
			return res[0]
		})
	}
}

export const articleRepo = new ArticleRepository()
