'use client'
import { LoaderCircle, Trash2 } from 'lucide-react'

import useDeleteTask from '@/hooks/use-delete-task'
import useUpdateTask from '@/hooks/use-update-task'
import { Task } from '@/lib/schemas/task-schema'
import { cn } from '@/lib/utils'

import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { updateTask, isPendingUpdate } = useUpdateTask({
    id: task.id,
    completed: task.completed,
  })
  const { deleteTask, isPendingDelete } = useDeleteTask({
    id: task.id,
  })

  const isPending = isPendingUpdate || isPendingDelete

  return (
    <div
      className={cn(
        'flex min-h-14 items-center justify-between gap-3 rounded-lg bg-gray-500 p-4',
        isPending && 'opacity-80',
      )}
    >
      <div className="group flex items-center text-gray-100">
        <Checkbox
          id={task.id}
          checked={task.completed}
          className="transition-colors duration-300 group-hover:border-secondary"
          onClick={updateTask}
          disabled={isPending}
        />
        <Label
          htmlFor={task.id}
          className="cursor-pointer pl-4 transition-colors duration-300 group-hover:text-secondary peer-data-[state=checked]:text-gray-300 peer-data-[state=checked]:line-through"
        >
          {task.title}
        </Label>
      </div>

      {isPending ? (
        <LoaderCircle className="size-5 animate-spin" />
      ) : (
        <button
          type="button"
          onClick={deleteTask}
          className="mb-auto flex size-6 items-center justify-center text-gray-300 transition-colors duration-300 hover:text-danger"
        >
          <Trash2 className="size-4" />
        </button>
      )}
    </div>
  )
}

export default TaskCard
