import { OpenAPIHono } from '@hono/zod-openapi'
import { HTTPException } from 'hono/http-exception'
import {
	deleteCategoryRoute,
	fetchCategoryListRoute,
	patchCategoryRoute,
	postCategoryRoute,
} from '../../openapi/category'
import { svc } from '../service'
import { handleErrors } from './error'

const app = new OpenAPIHono()

app.openapi(fetchCategoryListRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const allCategories = await svc.category.getAll()
		return ctx.json({ contents: allCategories })
	}, c)
})

app.openapi(postCategoryRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const body = ctx.req.valid('json')
		const res = await svc.category.create(body)
		return ctx.json(res)
	}, c)
})

app.openapi(patchCategoryRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const body = ctx.req.valid('json')
		const { categoryId } = ctx.req.valid('param')
		const res = await svc.category.updateById(body, categoryId)
		return ctx.json(res)
	}, c)
})

app.openapi(deleteCategoryRoute, async (c) => {
	return handleErrors(async (ctx) => {
		const { categoryId } = ctx.req.valid('param')
		const res = await svc.category.deleteById(categoryId)
		return ctx.json(res)
	}, c)
})

export { app as categoryApp }
