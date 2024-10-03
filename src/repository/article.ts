import { eq, sql } from 'drizzle-orm'
import type { ArticleInputSchema } from '../../openapi/article'
import { db } from '../db/db'
import { articlesTable } from '../db/schema'

const getAll = async () => {
	return await db
		.select()
		.from(articlesTable)
		.where(sql`${articlesTable.deletedAt} IS NULL`)
}

const findByTitle = async (title: string) => {
	return await db
		.select()
		.from(articlesTable)
		.where(eq(articlesTable.title, title))
}

const findById = async (articleId: string) => {
	return await db
		.select()
		.from(articlesTable)
		.where(eq(articlesTable.id, articleId))
}

const create = async (body: ArticleInputSchema) => {
	const res = await db.insert(articlesTable).values(body).$returningId()
	return res[0]
}

const updateById = async (body: ArticleInputSchema, articleId: string) => {
	return await db
		.update(articlesTable)
		.set({ updatedAt: sql`NOW()`, ...body })
		.where(eq(articlesTable.id, articleId))
}

const deleteById = async (articleId: string) => {
	return await db
		.update(articlesTable)
		.set({ deletedAt: sql`NOW()`, updatedAt: sql`NOW()` })
		.where(eq(articlesTable.id, articleId))
}

export const articleRepo = {
	getAll,
	findByTitle,
	findById,
	create,
	updateById,
	deleteById,
}
