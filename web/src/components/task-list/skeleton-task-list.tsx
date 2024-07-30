import { Skeleton } from '../ui/skeleton'
import TaskListHeader from './task-list-header'

const SkeletonTaskList = () => {
  return (
    <>
      <TaskListHeader tasks={null} count={0} />
      <div className="flex w-full flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="min-h-14 w-full" />
        ))}
      </div>
    </>
  )
}

export default SkeletonTaskList
