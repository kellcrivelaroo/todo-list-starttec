'use server'
import { revalidatePath } from 'next/cache'

import { env } from '@/env'
import { Task } from '@/lib/schemas/task-schema'

interface UpdateTaskActionProps {
  id: string
  completed: boolean
}

export const updateTaskAction = async ({
  id,
  completed,
}: UpdateTaskActionProps): Promise<Task | void> => {
  try {
    const response = await fetch(`${env.API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    })

    if (!response.ok) return

    revalidatePath('/')

    const updatedTask = await response.json()
    return updatedTask
  } catch (error) {
    console.error(error)
  }
}
