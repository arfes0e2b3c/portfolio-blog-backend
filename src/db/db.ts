import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

const client = new Client({
	host: 'db',
	user: 'root',
	password: 'password',
	port: 5432,
	database: 'testdb',
})

client.connect()

export const db = drizzle(client)
