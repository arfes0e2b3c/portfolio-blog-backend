import { eq, sql } from 'drizzle-orm'
import type { ArticleInputSchema } from '../../openapi/article'
import { db } from '../db/db'
import { articlesTable } from '../db/schema'

export const getAllArticles = async () => {
	return await db
		.select()
		.from(articlesTable)
		.where(sql`${articlesTable.deletedAt} IS NULL`)
}

export const findArticleByTitle = async (title: string) => {
	return await db
		.select()
		.from(articlesTable)
		.where(eq(articlesTable.title, title))
}

export const findArticleById = async (articleId: string) => {
	return await db
		.select()
		.from(articlesTable)
		.where(eq(articlesTable.id, articleId))
}

export const createArticle = async (body: ArticleInputSchema) => {
	const res = await db.insert(articlesTable).values(body).$returningId()
	return res[0]
}

export const updateArticleById = async (
	body: ArticleInputSchema,
	articleId: string
) => {
	return await db
		.update(articlesTable)
		.set({ updatedAt: sql`NOW()`, ...body })
		.where(eq(articlesTable.id, articleId))
}

export const deleteArticleById = async (articleId: string) => {
	return await db
		.update(articlesTable)
		.set({ deletedAt: sql`NOW()`, updatedAt: sql`NOW()` })
		.where(eq(articlesTable.id, articleId))
}
