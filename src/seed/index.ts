import { drizzle } from 'drizzle-orm/mysql2'
import * as mysql from 'mysql2/promise'
import { seedCategories } from './category'
import { seedArticles } from './article'

export const SeedPool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'testdb',
})

export const SeedDb = drizzle(SeedPool)

const seed = async () => {
	await seedCategories()
	await seedArticles()
}

seed()
	.then(() => {
		console.log('Seed data successfully inserted.')
	})
	.catch((error) => {
		console.error('Error seeding data:', error)
	})
	.finally(() => {
		SeedPool.end()
	})
