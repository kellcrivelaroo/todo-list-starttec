import { cn } from '@/lib/utils'

const Background = () => {
  return (
    <>
      <div
        className={cn(
          `absolute [background:radial-gradient(circle_at_center,_rgb(30,111,159,0.2)_0,_rgb(0,0,0,0)_50%)_no-repeat]`,
          `-bottom-32 -left-32 size-[120vw] [mix-blend-mode:screen] md:bottom-[calc(15%-42vw/2)] md:left-[calc(20%-42vw/2)] md:size-[42vw]`,
          `z-[-1] animate-pulse [transform-origin:center_center]`,
        )}
      />
      <div
        className={cn(
          `absolute hidden [background:radial-gradient(circle_at_center,_rgb(94,96,206,0.2)_0,_rgb(0,0,0,0)_50%)_no-repeat] md:block`,
          `right-[calc(10%-42vw/2)] top-[calc(50%-42vw/2)] size-10 [mix-blend-mode:screen] md:size-[42vw]`,
          `z-[-1] animate-pulse [transform-origin:center_center]`,
        )}
      />
    </>
  )
}

export default Background
