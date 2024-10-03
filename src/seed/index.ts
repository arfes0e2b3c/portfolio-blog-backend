import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { seedArticles } from './article'
import { seedCategories } from './category'

const client = new Pool({
	host: 'localhost',
	user: 'root',
	password: 'password',
	port: 5432,
	database: 'testdb',
})

export const SeedDb = drizzle(client)

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
		client.end()
	})
