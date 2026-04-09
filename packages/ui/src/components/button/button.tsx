import { forwardRef, type ButtonHTMLAttributes, type ElementRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@hamro-design-system/utils';
import { getButtonStyles } from './button.styles';

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps extends NativeButtonProps {
  asChild?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'neutral' | 'brand' | 'danger';
  variant?: 'solid' | 'soft' | 'outline' | 'ghost';
}

export const Button = forwardRef<ElementRef<'button'>, ButtonProps>(function Button(
  {
    asChild = false,
    className,
    fullWidth,
    size = 'md',
    style,
    tone = 'brand',
    type = 'button',
    variant = 'solid',
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      {...props}
      className={cn(className)}
      ref={ref}
      style={{
        ...getButtonStyles({ fullWidth, size, tone, variant }),
        ...style,
      }}
      type={asChild ? undefined : type}
    />
  );
});
