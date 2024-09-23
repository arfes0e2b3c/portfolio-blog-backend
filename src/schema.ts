import { sql } from "drizzle-orm";
import {
	boolean,
	mysqlTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/mysql-core";
import { ulid } from "ulid";

export const articles = mysqlTable("articles", {
	id: varchar("id", { length: 26 }).notNull().primaryKey(),
	title: varchar("title", { length: 255 }).notNull().unique(),
	content: text("content"),
	draftContent: text("draft_content"),
	eyecatch: varchar("eyecatch", { length: 100 }),
	category: varchar("category", { length: 26 }).references(
		() => categories.id,
		{ onDelete: "set null" },
	),
	isPublished: boolean("is_published").default(false),
	createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.$onUpdate(() => sql`CURRENT_TIMESTAMP`),
	publishedAt: timestamp("published_at").default(sql`NULL`),
	deletedAt: timestamp("deleted_at").default(sql`NULL`),
});

export const categories = mysqlTable("categories", {
	id: varchar("id", { length: 26 }).notNull().primaryKey(),
	name: varchar("name", { length: 16 }).notNull().unique(),
	createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
	publishedAt: timestamp("published_at").default(sql`NULL`),
	deletedAt: timestamp("deleted_at").default(sql`NULL`),
});
