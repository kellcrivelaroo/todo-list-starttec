'use server'
import { revalidatePath } from 'next/cache'

import { env } from '@/env'
import { Task } from '@/lib/schemas/task-schema'

interface DeleteTaskActionProps {
  id: string
}

export const deleteTaskAction = async ({
  id,
}: DeleteTaskActionProps): Promise<Task | void> => {
  try {
    const response = await fetch(`${env.API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) return

    revalidatePath('/')

    const deletedTask = await response.json()
    return deletedTask
  } catch (error) {
    console.error(error)
  }
}
