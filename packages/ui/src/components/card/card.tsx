import { forwardRef, type HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  mb?: string;
  ml?: string;
  mr?: string;
  mt?: string;
  padding?: string;
  w?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    mb = '0',
    ml = '0',
    mr = '0',
    mt = '0',
    padding = '8px',
    style,
    w = 'auto',
    ...props
  },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      style={{
        backgroundColor: 'var(--rds-color-neutral-0)',
        borderRadius: '8px',
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        padding,
        width: w,
        ...style,
      }}
    />
  );
});
