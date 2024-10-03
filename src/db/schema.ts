import { sql } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { ulid } from 'ulid'

export const articlesTable = pgTable('articles', {
	id: varchar('id', { length: 26 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => ulid()),
	title: varchar('title', { length: 255 }).notNull().unique(),
	content: text('content'),
	draftContent: text('draft_content'),
	eyecatch: varchar('eyecatch', { length: 255 }),
	category: varchar('category', { length: 26 }).references(
		() => categoriesTable.id,
		{ onDelete: 'set null' }
	),
	isPublished: boolean('is_published').default(false).notNull(),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.$onUpdate(() => sql`CURRENT_TIMESTAMP`)
		.notNull(),
	publishedAt: timestamp('published_at').default(sql`NULL`),
	deletedAt: timestamp('deleted_at').default(sql`NULL`),
})

export const categoriesTable = pgTable('categories', {
	id: varchar('id', { length: 26 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => ulid()),
	name: varchar('name', { length: 16 }).notNull().unique(),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
	publishedAt: timestamp('published_at').default(sql`NULL`),
	deletedAt: timestamp('deleted_at').default(sql`NULL`),
})
