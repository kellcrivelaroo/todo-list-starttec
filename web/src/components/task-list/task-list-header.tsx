'use client'
import { Task } from '@/lib/schemas/task-schema'

import Badge from '../shared/badge'

interface TaskListHeaderProps {
  tasks: Task[] | null
  count: number
}

const TaskListHeader = ({ tasks, count }: TaskListHeaderProps) => {
  return (
    <header className="mb-6 flex w-full justify-between gap-2 text-sm font-bold">
      <span className="flex items-center gap-2 text-nowrap text-primary">
        Tarefas criadas
        <Badge>{tasks?.length ?? '0'}</Badge>
      </span>
      <span className="flex items-center gap-2 text-secondary">
        Concluídas
        <Badge>{`${count} de ${tasks?.length ?? '0'}`}</Badge>
      </span>
    </header>
  )
}

export default TaskListHeader
