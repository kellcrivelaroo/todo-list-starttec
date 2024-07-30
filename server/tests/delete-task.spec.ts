import { fastify, FastifyInstance } from 'fastify'
import { deleteTask } from '../src/routes/delete-task'
import { prisma } from '../src/lib/prisma'

describe('DELETE /tasks/:id', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = fastify()
    app.register(deleteTask)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete a task successfully', async () => {
    const createdTask = await prisma.task.create({
      data: { title: 'Task to be deleted' }
    })
    
    const response = await app.inject({
      method: 'DELETE',
      url: `/tasks/${createdTask.id}`
    })
    
    expect(response.statusCode).toBe(200)
    const task = JSON.parse(response.payload)

    expect(task.id).toBe(createdTask.id)
    expect(task.title).toBe('Task to be deleted')
  })

  it('should return 404 if task is not found', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/tasks/invalid-id`
    })

    expect(response.statusCode).toBe(404)
    const error = JSON.parse(response.payload)

    expect(error.error).toBe('Task not found')
  })

  it('should handle unexpected internal server errors', async () => {
    jest.spyOn(prisma.task, 'delete').mockRejectedValueOnce(new Error('Unexpected error'))
    
    const response = await app.inject({
      method: 'DELETE',
      url: `/tasks/valid-id`
    })
    
    expect(response.statusCode).toBe(500)
    const error = JSON.parse(response.payload)
    
    expect(error.error).toBe('Internal Server Error')
  })
})
