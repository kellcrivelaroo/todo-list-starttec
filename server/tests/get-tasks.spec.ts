import { fastify, FastifyInstance } from "fastify"
import { getTasks } from "../src/routes/get-tasks"
import { prisma } from "../src/lib/prisma"

describe('GET /tasks', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = fastify()
    await app.register(getTasks)
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a list of tasks', async () => {
    const tasks = [
      { id: '1', title: 'Test Task 1', completed: false, createdAt: new Date() },
      { id: '2', title: 'Test Task 2', completed: false, createdAt: new Date() }
    ]

    prisma.task.findMany = jest.fn().mockResolvedValue(tasks)

    const response = await app.inject({
      method: 'GET',
      url: '/tasks',
    })
    const responseData = JSON.parse(response.payload)
    
    expect(response.statusCode).toBe(200)
    expect(responseData[0].id).toBe(tasks[0].id)
    expect(responseData[1].title).toBe(tasks[1].title)
    expect(responseData[1]).toHaveProperty('createdAt')
  })

  it('should return 500 on error', async () => {
    prisma.task.findMany = jest.fn().mockRejectedValue(new Error('Internal Server Error'))

    const response = await app.inject({
      method: 'GET',
      url: '/tasks',
    })

    expect(response.statusCode).toBe(500)
    expect(JSON.parse(response.payload)).toEqual({ error: 'Internal Server Error' })
  })
})