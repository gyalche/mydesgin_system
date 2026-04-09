import { forwardRef, type HTMLAttributes } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  mb?: string;
  ml?: string;
  mr?: string;
  mt?: string;
  w?: string;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    mb = '12px',
    ml = '0',
    mr = '0',
    mt = '12px',
    style,
    w = '100%',
    ...props
  },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      role="separator"
      style={{
        backgroundColor: 'var(--rds-color-neutral-3)',
        borderRadius: '21px',
        height: '2px',
        margin: `${mt} ${mr} ${mb} ${ml}`,
        width: w,
        ...style,
      }}
    />
  );
});
