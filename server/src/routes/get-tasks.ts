import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../lib/prisma"

export async function getTasks(app: FastifyInstance) {
  app.get('/tasks', async (req: FastifyRequest, res: FastifyReply) => {
    try {
      // simula 600ms de delay na execução
      await new Promise(resolve => setTimeout(resolve, 600))

      const tasks = await prisma.task.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })

      return res.status(200).send(tasks)
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' })
    }
  })
}