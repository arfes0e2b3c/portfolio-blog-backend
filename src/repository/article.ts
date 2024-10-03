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
		.where(
			sql`${articlesTable.title} = ${title} and ${articlesTable.deletedAt} IS NULL`
		)
}

const findById = async (articleId: string) => {
	return await db
		.select()
		.from(articlesTable)
		.where(
			sql`${articlesTable.id} = ${articleId} and ${articlesTable.deletedAt} IS NULL`
		)
}

const create = async (body: ArticleInputSchema) => {
	const res = await db
		.insert(articlesTable)
		.values(body)
		.returning({ id: articlesTable.id })
	return res[0]
}

const updateById = async (body: ArticleInputSchema, articleId: string) => {
	const res = await db
		.update(articlesTable)
		.set({ updatedAt: sql`NOW()`, ...body })
		.where(
			sql`${articlesTable.id} = ${articleId} and ${articlesTable.deletedAt} IS NULL`
		)
		.returning({ id: articlesTable.id })
	return res[0]
}

const deleteById = async (articleId: string) => {
	const res = await db
		.update(articlesTable)
		.set({ deletedAt: sql`NOW()`, updatedAt: sql`NOW()` })
		.where(
			sql`${articlesTable.id} = ${articleId} and ${articlesTable.deletedAt} IS NULL`
		)
		.returning({ id: articlesTable.id })
	return res[0]
}

export const articleRepo = {
	getAll,
	findByTitle,
	findById,
	create,
	updateById,
	deleteById,
}
