import { use } from 'react'

import { Task } from '@/lib/schemas/task-schema'

import EmptyList from './empty-list'
import TaskCard from './task-card'
import TaskListHeader from './task-list-header'

interface TaskListProps {
  tasksPromise: Promise<Task[] | null>
}

const TaskList = ({ tasksPromise }: TaskListProps) => {
  const tasks = use(tasksPromise)

  if (!tasks?.length) return <EmptyList />

  const completedTasksCount =
    tasks?.filter((task) => task.completed)?.length ?? 0

  return (
    <section className="w-full">
      <TaskListHeader tasks={tasks} count={completedTasksCount} />
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  )
}

export default TaskList
