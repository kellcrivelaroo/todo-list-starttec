import { useTransition } from 'react'
import { toast } from 'sonner'

import { updateTaskAction } from '@/actions/update-task-action'

interface useUpdateTaskProps {
  id: string
  completed: boolean
}

const useUpdateTask = ({ id, completed }: useUpdateTaskProps) => {
  const [isPending, startTransition] = useTransition()

  const updateTask = () => {
    startTransition(async () => {
      const updatedTask = await updateTaskAction({
        id,
        completed: !completed,
      })
      if (!updatedTask) toast.error('Erro ao atualizar o status.')
    })
  }

  return {
    updateTask,
    isPendingUpdate: isPending,
  }
}

export default useUpdateTask
