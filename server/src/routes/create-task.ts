import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../lib/prisma"
import { z } from "zod"

const createTaskBody = z.object({
  title: z.string(),
})

export async function createTask(app: FastifyInstance) {
  app.post('/tasks', async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { title } = createTaskBody.parse(req.body)

      const task = await prisma.task.create({
        data: {
          title,
        },
      })

      res.status(201).send(task)
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.errors })
      } else {
        res.status(500).send({ error: 'Internal Server Error' })
      }
    }
  })
}