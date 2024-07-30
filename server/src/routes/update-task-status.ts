import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../lib/prisma"
import { z } from "zod"

const updateTaskStatusBody = z.object({
  completed: z.boolean(),
})

export async function updateTaskStatus(app: FastifyInstance) {
  app.patch('/tasks/:id', async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = req.params as { id: string }
      const { completed } = updateTaskStatusBody.parse(req.body)

      const task = await prisma.task.update({
        where: { id },
        data: { completed },
      })

      return res.status(200).send(task)
    } catch (error) {
      // Verifica o código de erro específico do Prisma quando um registro não é encontrado
      if ((error as any).code === 'P2025') {
        return res.status(404).send({ error: 'Task not found' })
      }
      if (error instanceof z.ZodError) {
        return res.status(400).send({ error: error.errors })
      } 
      return res.status(500).send({ error: 'Internal Server Error' })
    }
  })
}
