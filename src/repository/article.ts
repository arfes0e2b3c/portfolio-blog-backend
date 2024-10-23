import { sql } from 'drizzle-orm'
import type { ArticleInputSchema } from '../../openapi/article'
import { withDbConnection } from '../db'
import { articlesTable } from '../db/schema'

class ArticleRepository {
	async getAll() {
		return withDbConnection(async (db) => {
			return await db
				.select()
				.from(articlesTable)
				.where(sql`${articlesTable.deletedAt} IS NULL`)
		})
	}

	async findByTitle(title: string) {
		return withDbConnection(async (db) => {
			return await db
				.select()
				.from(articlesTable)
				.where(
					sql`${articlesTable.title} = ${title} and ${articlesTable.deletedAt} IS NULL`
				)
		})
	}

	async findById(articleId: string) {
		return withDbConnection(async (db) => {
			return await db
				.select()
				.from(articlesTable)
				.where(
					sql`${articlesTable.id} = ${articleId} and ${articlesTable.deletedAt} IS NULL`
				)
		})
	}

	async create(body: ArticleInputSchema) {
		return withDbConnection(async (db) => {
			const res = await db
				.insert(articlesTable)
				.values(body)
				.returning({ id: articlesTable.id })
			return res[0]
		})
	}

	async updateById(body: ArticleInputSchema, articleId: string) {
		return withDbConnection(async (db) => {
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

	async deleteById(articleId: string) {
		return withDbConnection(async (db) => {
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
