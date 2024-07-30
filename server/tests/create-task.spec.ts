import { fastify, FastifyInstance } from "fastify"
import { createTask } from "../src/routes/create-task"
import { prisma } from "../src/lib/prisma"

describe('POST /tasks', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = fastify()
    app.register(createTask)
    
  })

  afterEach(async () => {
    await prisma.task.deleteMany({})
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new task', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: {
        title: 'New Task'
      }
    })
    const task = JSON.parse(response.payload)
    
    expect(response.statusCode).toBe(201)
    expect(task).toHaveProperty('id')
    expect(task.title).toBe('New Task')
  })

  it('should return 400 if title is missing', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: {}
    })
    const error = JSON.parse(response.payload)
  
    expect(response.statusCode).toBe(400)
    expect(error.error).toHaveLength(1)
    expect(error.error[0].message).toBe('Required')
  })

  it('should handle internal server errors', async () => {
    jest.spyOn(prisma.task, 'create').mockRejectedValueOnce(new Error('Database error'))

    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: {
        title: 'Task with DB Error'
      }
    })
    const error = JSON.parse(response.payload)
    
    expect(response.statusCode).toBe(500)
    expect(error.error).toBe('Internal Server Error')
  })
})
