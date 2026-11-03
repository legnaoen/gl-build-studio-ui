import { cn } from '@/lib/utils'

export function Kbd({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        'inline-flex h-4 items-center rounded-sm border border-input bg-muted px-1 font-mono text-[10px] text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}
