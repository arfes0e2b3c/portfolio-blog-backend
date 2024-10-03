import { OpenAPIHono } from '@hono/zod-openapi'
import {
	deleteArticleRoute,
	fetchArticleListRoute,
	patchArticleRoute,
	postArticleRoute,
} from '../../openapi/article'
import { svc } from '../service'
import { handleErrors } from './error'

const app = new OpenAPIHono()

app.openapi(fetchArticleListRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const allArticles = await svc.article.getAll()

		return ctx.json({ contents: allArticles })
	}, c)
})

app.openapi(postArticleRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const body = ctx.req.valid('json')
		const res = await svc.article.create(body)
		return ctx.json(res)
	}, c)
})

app.openapi(patchArticleRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const body = ctx.req.valid('json')
		const { articleId } = ctx.req.valid('param')
		const res = await svc.article.updateById(body, articleId)
		return ctx.json(res)
	}, c)
})

app.openapi(deleteArticleRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const { articleId } = ctx.req.valid('param')
		const res = await svc.article.deleteById(articleId)
		return ctx.json(res)
	}, c)
})

export { app as articleApp }
