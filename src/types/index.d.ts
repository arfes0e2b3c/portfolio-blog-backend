import { z } from 'zod'

const zEnv = z.object({
	DB_HOST: z.string(),
	DB_USER: z.string(),
	DB_PASSWORD: z.string(),
	DB_PORT: z.number(),
	DB_NAME: z.string(),
})

export type Env = z.infer<typeof zEnv>
