'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus, LoaderCircle } from 'lucide-react'
import { useActionState, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { createTaskAction } from '@/actions/create-task-action'
import { NewTask, newTaskSchema } from '@/lib/schemas/new-task-schema'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const NewTaskForm = () => {
  const [state, formAction, isPending] = useActionState(createTaskAction, {
    message: '',
  })

  const form = useForm<NewTask>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      title: '',
    },
  })

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <section className="w-full pb-11 pt-12 md:pb-16 md:pt-14">
      <Form {...form}>
        <form
          className="flex items-start gap-2"
          ref={formRef}
          action={formAction}
          onSubmit={(evt) => {
            evt.preventDefault()
            form.handleSubmit(() => {
              formAction(new FormData(formRef.current!))
              form.reset()
            })(evt)
          }}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormControl>
                  <Input
                    placeholder="Adicione uma nova tarefa"
                    className="h-14"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute" />
                {state?.message && (
                  <FormMessage className="absolute">
                    {state.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-14 gap-2 p-4 font-bold md:text-lg"
            disabled={isPending}
          >
            Criar
            {isPending ? (
              <LoaderCircle className="size-5 animate-spin md:size-6" />
            ) : (
              <CirclePlus className="size-5 md:size-6" />
            )}
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default NewTaskForm
