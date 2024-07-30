import { z } from 'zod'

export const newTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'O título da tarefa é obrigatório.' }),
})

export type NewTask = z.infer<typeof newTaskSchema>
