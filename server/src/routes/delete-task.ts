import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { prisma } from "../lib/prisma"
import { z } from "zod"

const updateTaskStatusBody = z.object({
  id: z.string().uuid(),
})

type DeleteTaskParams = z.infer<typeof updateTaskStatusBody>

export async function deleteTask(app: FastifyInstance) {
  app.delete('/tasks/:id', async (
    req: FastifyRequest<{ Params: DeleteTaskParams }>, 
    res: FastifyReply) => {
      try {
        const { id } = req.params

        const task = await prisma.task.delete({
          where: { id },
        })
        
        return res.status(200).send(task)
      } catch (error) {
        // Verifica o código de erro específico do Prisma quando um registro não é encontrado
        if ((error as any).code === 'P2025') {
          return res.status(404).send({ error: 'Task not found' })
        } else {
          return res.status(500).send({ error: 'Internal Server Error' })
        }
      }
    }
  )
}
