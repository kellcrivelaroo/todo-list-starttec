import { PropsWithChildren } from 'react'

const Badge = ({ children }: PropsWithChildren) => {
  return (
    <span className="flex min-w-8 items-center justify-center text-nowrap rounded-full bg-gray-400 px-2 py-0.5 text-sm text-foreground text-gray-200">
      {children}
    </span>
  )
}

export default Badge
