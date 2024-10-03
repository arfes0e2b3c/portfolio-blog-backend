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
		.onDuplicateKeyUpdate({
			set: { name: sql`name`, updatedAt: sql`updated_at` },
		})

	console.log('Categories seeded.')
}
