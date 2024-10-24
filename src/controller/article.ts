import { OpenAPIHono } from '@hono/zod-openapi'
import {
	deleteArticleRoute,
	fetchArticleDetailRoute,
	fetchArticleListRoute,
	patchArticleRoute,
	postArticleRoute,
} from '../../openapi/article'
import { svc } from '../service'
import { handleErrors } from './error'

const app = new OpenAPIHono()

app.openapi(fetchArticleListRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const res = await svc.article.getAll(ctx)
		return ctx.json({ contents: res })
	}, c)
})

app.openapi(fetchArticleDetailRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const { articleId } = ctx.req.valid('param')
		const res = await svc.article.findById(ctx, articleId)
		return ctx.json({ contents: res })
	}, c)
})

app.openapi(postArticleRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const body = ctx.req.valid('json')
		const res = await svc.article.create(ctx, body)
		return ctx.json(res)
	}, c)
})

app.openapi(patchArticleRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const body = ctx.req.valid('json')
		const { articleId } = ctx.req.valid('param')
		const res = await svc.article.updateById(ctx, body, articleId)
		return ctx.json(res)
	}, c)
})

app.openapi(deleteArticleRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const { articleId } = ctx.req.valid('param')
		const res = await svc.article.deleteById(ctx, articleId)
		return ctx.json(res)
	}, c)
})

export { app as articleApp }
