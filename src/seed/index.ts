import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { seedArticles } from './article'
import { seedCategories } from './category'

const client = new Pool({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || 'password',
	port: Number(process.env.DB_PORT) || 5432,
	database: process.env.DB_NAME || 'testdb',
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
