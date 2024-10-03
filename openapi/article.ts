import { createRoute, z } from "@hono/zod-openapi";
import { zString } from "./common";

const ArticleSchema = z.object({
	contents: z.array(
		z.object({
			id: zString("01J8F3RR15SSSVV2F3AGMJ4ZE7"),
			title: zString("タイトル").max(255),
			content: zString("本文").nullable(),
			draftContent: zString("下書き").nullable(),
			category: zString("01J8KPNPB3KMA361MQAJDDT43F").nullable(),
			isPublished: z.boolean().default(false),
			createdAt: zString("2024-09-23 07:57:06").datetime(),
			updatedAt: zString("2024-09-23 07:57:06").datetime(),
			publishedAt: zString("2024-09-23 07:57:06").datetime().nullable(),
			deletedAt: zString("2024-09-23 07:57:06").datetime().nullable(),
		}),
	),
});

const ArticleInputSchema = z.object({
	title: zString("タイトル").max(255),
	content: zString("本文"),
	draftContent: zString("下書き"),
	category: zString("01J8KPNPB3KMA361MQAJDDT43F"),
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
			articleId: zString("01J8F3CJR0NJM89W64KYWSEJVA"),
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

export const deleteArticleRoute = createRoute({
	path: "/{articleId}",
	method: "delete",
	description: "記事を論理削除する",
	request: {
		params: z.object({
			articleId: zString("01J8F3CJR0NJM89W64KYWSEJVA"),
		}),
	},
	responses: {
		200: {
			description: "OK",
		},
		500: {
			description: "Internal Server Err",
		},
	},
});
