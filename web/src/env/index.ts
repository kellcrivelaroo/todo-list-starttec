import { z } from 'zod'

const envSchema = z.object({
  API_URL: z.string().url().default('https://localhost:3333'),
})

const _env = {
  API_URL: process.env.API_URL,
}

const parsedEnv = envSchema.safeParse(_env)

if (!parsedEnv.success) {
  const msg = 'Invalid public enviroment variables'
  console.error(msg, parsedEnv.error.flatten().fieldErrors)

  throw new Error(msg)
}

export const env = parsedEnv.data
