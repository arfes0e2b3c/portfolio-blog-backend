import { OpenAPIHono } from '@hono/zod-openapi'
import {
	deleteArticleRoute,
	fetchArticleListRoute,
	patchArticleRoute,
	postArticleRoute,
} from '../../openapi/article'
import { domain } from '../domain'
import { repo } from '../repository'
import { handleErrors } from './error'

const app = new OpenAPIHono()

app.openapi(fetchArticleListRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const allArticles = await repo.article.getAll()

		return ctx.json({ contents: allArticles })
	}, c)
})

app.openapi(postArticleRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const body = ctx.req.valid('json')
		await domain.article.isUniqueTitle(body.title)
		await domain.category.exists(body.category)
		const res = await repo.article.create(body)
		return ctx.json(res)
	}, c)
})

app.openapi(patchArticleRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const body = ctx.req.valid('json')
		const { articleId } = ctx.req.valid('param')
		await domain.article.exists(articleId)
		await domain.article.isUniqueTitle(body.title)
		await domain.category.exists(body.category)
		await repo.article.updateById(body, articleId)
		return ctx.json({ id: articleId })
	}, c)
})

app.openapi(deleteArticleRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const { articleId } = ctx.req.valid('param')
		await domain.article.exists(articleId)
		await repo.article.deleteById(articleId)
		return ctx.json({})
	}, c)
})

export { app as articleApp }
