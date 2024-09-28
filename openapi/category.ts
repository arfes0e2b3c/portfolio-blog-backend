import { createRoute, z } from "@hono/zod-openapi";
import { zString } from "./common";

const CategorySchema = z.object({
	contents: z.array(
		z.object({
			id: zString("01J8F3RR15SSSVV2F3AGMJ4ZE7"),
			name: zString("カテゴリー"),
			createdAt: zString("2024-09-23 07:57:06").datetime(),
			updatedAt: zString("2024-09-23 07:57:06").datetime(),
			publishedAt: zString("2024-09-23 07:57:06").datetime().nullable(),
			deletedAt: zString("2024-09-23 07:57:06").datetime().nullable(),
		}),
	),
});

const CategoryInputSchema = z.object({
	name: zString("カテゴリー"),
});

export type CategoryInputSchema = z.infer<typeof CategoryInputSchema>;

export const fetchCategoryListRoute = createRoute({
	path: "/",
	method: "get",
	description: "カテゴリーの一覧を取得する",
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: CategorySchema,
				},
			},
		},
	},
});

export const postCategoryRoute = createRoute({
	path: "/",
	method: "post",
	description: "カテゴリーを新規追加する",
	request: {
		body: {
			required: true,
			content: {
				"application/json": {
					schema: CategoryInputSchema,
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

export const patchCategoryRoute = createRoute({
	path: "/{categoryId}",
	method: "patch",
	description: "カテゴリーを更新する",
	request: {
		params: z.object({
			categoryId: zString("01J8F3CJR0NJM89W64KYWSEJVA"),
		}),
		body: {
			required: true,
			content: {
				"application/json": {
					schema: CategoryInputSchema,
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

export const deleteCategoryRoute = createRoute({
	path: "/{categoryId}",
	method: "delete",
	description: "カテゴリーを論理削除する",
	request: {
		params: z.object({
			categoryId: zString("01J8F3CJR0NJM89W64KYWSEJVA"),
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
