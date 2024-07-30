import { z } from 'zod'

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.date(),
})

export type Task = z.infer<typeof taskSchema>
