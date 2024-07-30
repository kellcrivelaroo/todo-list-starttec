import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteTaskAction } from '@/actions/delete-task-action'

interface useDeleteTaskProps {
  id: string
}

const useDeleteTask = ({ id }: useDeleteTaskProps) => {
  const [isPending, startTransition] = useTransition()

  const deleteTask = () => {
    startTransition(async () => {
      const deletedTask = await deleteTaskAction({
        id,
      })
      if (!deletedTask) toast.error('Erro ao deletar tarefa.')
    })
  }

  return {
    deleteTask,
    isPendingDelete: isPending,
  }
}

export default useDeleteTask
