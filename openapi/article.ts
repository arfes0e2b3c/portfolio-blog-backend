import { createRoute, z } from "@hono/zod-openapi";
import { zString } from "./common";

const ArticleSchema = z.object({
	contents: z.array(
		z.object({
			id: zString("01J8F3RR15SSSVV2F3AGMJ4ZE7"),
			title: zString("タイトル"),
			content: zString("本文").nullable(),
			draftContent: zString("下書き").nullable(),
			category: zString("ej2iiz33-ipq").nullable(),
			isPublished: z.boolean().default(false),
			createdAt: zString("2024-09-23 07:57:06").datetime(),
			updatedAt: zString("2024-09-23 07:57:06").datetime(),
			publishedAt: zString("2024-09-23 07:57:06").datetime().nullable(),
			deletedAt: zString("2024-09-23 07:57:06").datetime().nullable(),
		}),
	),
});

const ArticleInputSchema = z.object({
	title: zString("タイトル"),
	content: zString("本文"),
	draftContent: zString("下書き"),
	category: zString("ej2iiz33-ipq"),
	isPublished: z.boolean(),
});

export const fetchArticleListRoute = createRoute({
	path: "/",
	method: "get",
	description: "記事の一覧を表示する",
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: ArticleSchema,
				},
			},
		},
	},
});

export const postArticleRoute = createRoute({
	path: "/",
	method: "post",
	description: "記事を新規追加する",
	request: {
		body: {
			required: true,
			content: {
				"application/json": {
					schema: ArticleInputSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: z.object({
						id: zString("01J8F3CJR0NJM89W64KYWSEJVA"),
					}),
				},
			},
		},
	},
});

export const patchArticleRoute = createRoute({
	path: "/{articleId}",
	method: "patch",
	description: "記事を更新する",
	request: {
		params: z.object({
			articleId: z.string(),
		}),
		body: {
			required: true,
			content: {
				"application/json": {
					schema: ArticleInputSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: z.object({
						id: zString("01J8F3CJR0NJM89W64KYWSEJVA"),
					}),
				},
			},
		},
		500: {
			description: "Internal Server Err",
		},
	},
});
