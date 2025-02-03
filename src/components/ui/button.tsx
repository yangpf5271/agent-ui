import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import LoadingSpinner from '@/components/ui/LoadingSpinner'

import { cn } from '@/utils/cn'
import Icon from '@/components/ui/icon'
import { type ICONS } from '@/components/ui/icon/constants'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 font-dmmono uppercase select-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-accent shadow-sm hover:bg-primary/80',
        destructive:
          'bg-destructive text-white shadow-sm hover:bg-destructive/80',
        outline:
          'border border-border text-primary bg-transparent shadow-sm hover:bg-primary/5',
        secondary: 'bg-secondary text-primary shadow-sm hover:bg-secondary/50',
        ghost: 'hover:bg-primary/5 text-accent',
        link: 'text-primary hover:text-primary/80 disabled:text-muted/50',
        reload: 'text-primary bg-background',
        icon: 'hover:bg-none'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
        xs: 'size-4'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  icon?: keyof typeof ICONS
  iconPosition?: 'left' | 'right'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      icon,
      children,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading && 'bg-primary text-accent',
          'inline-flex items-center gap-2',
          iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row'
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner
            className={cn(
              'absolute left-1/2 mt-0 size-5 -translate-x-1/2 stroke-accent transition-opacity duration-200'
            )}
          />
        ) : (
          <>
            {icon && (
              <Icon
                type={icon}
                size="xs"
                className={cn(
                  variant === 'default' && 'text-accent',
                  variant === 'destructive' && 'text-white',
                  icon === 'loader' && 'animate-spin',
                  className,
                  'border-none'
                )}
              />
            )}
            {children}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
