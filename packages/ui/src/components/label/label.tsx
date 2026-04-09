import { forwardRef, type HTMLAttributes } from 'react';
import { Typography } from '../typography';

export interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  disabled?: boolean;
}

export const Label = forwardRef<HTMLDivElement, LabelProps>(function Label(
  {
    disabled = false,
    style,
    ...props
  },
  ref,
) {
  return (
    <Typography
      {...props}
      level="p2"
      ref={ref}
      style={{
        color: disabled ? 'var(--rds-color-neutral-5)' : 'var(--rds-color-neutral-9)',
        ...style,
      }}
    />
  );
});
