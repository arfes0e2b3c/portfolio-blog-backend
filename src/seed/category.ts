import { sql } from 'drizzle-orm'
import { SeedDb } from '.'
import { categoriesTable } from '../db/schema'

export const seedCategories = async () => {
	await SeedDb.insert(categoriesTable)
		.values([
			{ name: 'フロントエンド' },
			{ name: 'インターン' },
			{ name: '就活' },
			{ name: '仕事' },
			{ name: 'その他' },
		])
		.onConflictDoUpdate({
			target: categoriesTable.id,
			set: {
				name: sql`${categoriesTable.name}`,
				updatedAt: sql`${categoriesTable.updatedAt}`,
			},
		})

	console.log('Categories seeded.')
}
