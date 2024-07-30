import { fastify } from 'fastify'
import { createTask } from './routes/create-task'
import { getTasks } from './routes/get-tasks'
import { updateTaskStatus } from './routes/update-task-status'
import { deleteTask } from './routes/delete-task'

const app = fastify()
const port = Number(process.env.PORT) || 3333

app.register(getTasks)
app.register(createTask)
app.register(updateTaskStatus)
app.register(deleteTask)

app.listen({ port }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(`Server running at port ${port}`)
})
