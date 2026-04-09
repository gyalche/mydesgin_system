import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Button, type ButtonProps } from '../button';

export interface IconButtonProps extends Omit<ButtonProps, 'children'>, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    'aria-label': ariaLabel,
    children,
    size = 'md',
    style,
    ...props
  },
  ref,
) {
  return (
    <Button
      {...props}
      aria-label={ariaLabel}
      ref={ref}
      size={size}
      style={{
        aspectRatio: '1 / 1',
        padding: 0,
        width: size === 'sm' ? '2rem' : size === 'lg' ? '3rem' : '2.5rem',
        ...style,
      }}
    >
      {children}
    </Button>
  );
});
