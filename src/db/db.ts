import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

// 環境変数からデータベース接続情報を取得
const client = new Client({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || 'password',
	port: Number(process.env.DB_PORT) || 5432,
	database: process.env.DB_NAME || 'testdb',
})

client.connect()

export const db = drizzle(client)
