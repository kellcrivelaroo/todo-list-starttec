import { fastify, FastifyInstance } from 'fastify'
import { updateTaskStatus } from '../src/routes/update-task-status'
import { prisma } from '../src/lib/prisma'

describe('PATCH /tasks/:id', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = fastify()
    app.register(updateTaskStatus)
  })

  afterEach(async () => {
    await prisma.task.deleteMany({})
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update the status of a task successfully', async () => {
    const createdTask = await prisma.task.create({
      data: { title: 'Task to update', completed: false }
    })

    const response = await app.inject({
      method: 'PATCH',
      url: `/tasks/${createdTask.id}`,
      payload: { completed: true }
    })
    
    expect(response.statusCode).toBe(200)
    const task = JSON.parse(response.payload)

    expect(task.id).toBe(createdTask.id)
    expect(task.completed).toBe(true)
  })

  it('should return 400 if request body is invalid', async () => {
    const createdTask = await prisma.task.create({
      data: { title: 'Task to test invalid body', completed: false }
    })

    const response = await app.inject({
      method: 'PATCH',
      url: `/tasks/${createdTask.id}`,
      payload: { invalidField: 'someValue' }
    })

    expect(response.statusCode).toBe(400)
    const error = JSON.parse(response.payload)

    expect(error.error).toHaveLength(1)
    expect(error.error[0].message).toBe('Required')
  })

  it('should return 404 if task is not found', async () => {
    jest.spyOn(prisma.task, 'update').mockRejectedValueOnce({ code: 'P2025' })
    
    const response = await app.inject({
      method: 'PATCH',
      url: `/tasks/invalid-id`,
      payload: { completed: true }
    })

    expect(response.statusCode).toBe(404)
    const error = JSON.parse(response.payload)
    
    expect(error.error).toBe('Task not found')
  })

  it('should handle internal server errors', async () => {
    jest.spyOn(prisma.task, 'update').mockRejectedValueOnce(new Error('Database error'))

    const response = await app.inject({
      method: 'PATCH',
      url: `/tasks/valid-id`,
      payload: { completed: true }
    })
    
    expect(response.statusCode).toBe(500)
    const error = JSON.parse(response.payload)

    expect(error.error).toBe('Internal Server Error')
  })
})
