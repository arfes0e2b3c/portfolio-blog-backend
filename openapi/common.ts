import { z } from "@hono/zod-openapi";

export const zString = (example: string) =>
	z.string().openapi({
		example,
	});
