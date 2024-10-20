import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { articleApp } from '../src/controller/article'
import { categoryApp } from '../src/controller/category'

const app = new Hono()

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		console.error('App Error:', err)
		return err.getResponse()
	}
	console.error('Unhandled Error:', err)
	return c.text(`Unexpected Error: ${err.message}`, 500)
})

app.route('/articles', articleApp)
app.route('/categories', categoryApp)

// app.doc31('/doc', {
// 	openapi: '3.1.0',
// 	info: {
// 		title: 'api',
// 		version: '1.0.0',
// 	},
// })

app.get(
	'/ui',
	swaggerUI({
		url: '/doc',
	})
)

export default app
