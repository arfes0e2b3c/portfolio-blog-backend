import { sql } from 'drizzle-orm'
import type { ArticleInputSchema } from '../../openapi/article'
import { db } from '../db/db'
import { articlesTable } from '../db/schema'

class ArticleRepository {
	async getAll() {
		return await db
			.select()
			.from(articlesTable)
			.where(sql`${articlesTable.deletedAt} IS NULL`)
	}

	async findByTitle(title: string) {
		return await db
			.select()
			.from(articlesTable)
			.where(
				sql`${articlesTable.title} = ${title} and ${articlesTable.deletedAt} IS NULL`
			)
	}

	async findById(articleId: string) {
		return await db
			.select()
			.from(articlesTable)
			.where(
				sql`${articlesTable.id} = ${articleId} and ${articlesTable.deletedAt} IS NULL`
			)
	}

	async create(body: ArticleInputSchema) {
		const res = await db
			.insert(articlesTable)
			.values(body)
			.returning({ id: articlesTable.id })
		return res[0]
	}

	async updateById(body: ArticleInputSchema, articleId: string) {
		const res = await db
			.update(articlesTable)
			.set({ updatedAt: sql`NOW()`, ...body })
			.where(
				sql`${articlesTable.id} = ${articleId} and ${articlesTable.deletedAt} IS NULL`
			)
			.returning({ id: articlesTable.id })
		return res[0]
	}

	async deleteById(articleId: string) {
		const res = await db
			.update(articlesTable)
			.set({ deletedAt: sql`NOW()`, updatedAt: sql`NOW()` })
			.where(
				sql`${articlesTable.id} = ${articleId} and ${articlesTable.deletedAt} IS NULL`
			)
			.returning({ id: articlesTable.id })
		return res[0]
	}
}

export const articleRepo = new ArticleRepository()
