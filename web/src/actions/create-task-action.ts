'use server'
import { revalidatePath } from 'next/cache'

import { env } from '@/env'

import { newTaskSchema } from '../lib/schemas/new-task-schema'

type FormState = {
  message: string
}

export const createTaskAction = async (
  _previousState: FormState,
  data: FormData,
): Promise<FormState> => {
  const formData = Object.fromEntries(data)
  const parsed = newTaskSchema.safeParse(formData)

  if (!parsed.success) {
    return {
      message: 'Dados inválidos.',
    }
  }

  try {
    const response = await fetch(`${env.API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: parsed.data.title }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erro ao criar tarefa:', errorData)
      throw new Error('Erro ao criar tarefa.')
    }

    revalidatePath('/')

    return {
      message: '',
    }
  } catch (error) {
    console.error('Erro interno:', error)
    return {
      message: 'Erro interno. Tente novamente em instantes.',
    }
  }
}
