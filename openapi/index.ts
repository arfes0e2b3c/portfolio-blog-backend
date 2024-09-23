import { createRoute, z } from "@hono/zod-openapi";

const UserSchema = z
	.array(
		z.object({
			id: z.string().openapi({
				example: "111",
			}),
			name: z.string().openapi({
				example: "John Doe",
			}),
		}),
	)
	.openapi("User");

export const route = createRoute({
	path: "/",
	method: "get",
	description: "userの一覧を表示する",
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: UserSchema,
				},
			},
		},
	},
});
