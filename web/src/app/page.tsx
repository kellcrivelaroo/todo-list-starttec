import { Suspense } from 'react'

import NewTaskForm from '@/components/new-task-form/new-task-form'
import SkeletonTaskList from '@/components/task-list/skeleton-task-list'
import TaskList from '@/components/task-list/task-list'
import { env } from '@/env'
import { Task } from '@/lib/schemas/task-schema'

async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await fetch(`${env.API_URL}/tasks`)
    if (!response.ok) {
      throw new Error('Network response failed')
    }
    return response.json()
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    return []
  }
}

export default function Home() {
  const tasksPromise = fetchTasks()

  return (
    <main className="container mx-auto flex w-full max-w-[800px] flex-col items-center">
      <NewTaskForm />
      <Suspense fallback={<SkeletonTaskList />}>
        <TaskList tasksPromise={tasksPromise} />
      </Suspense>
    </main>
  )
}
