import {
  createElement,
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';
import { cn } from '@hamro-design-system/utils';

export const typographyStyles = {
  h1: { fontSize: '42px', fontWeight: 700 },
  h2: { fontSize: '35px', fontWeight: 700 },
  h3: { fontSize: '29px', fontWeight: 700 },
  h4: { fontSize: '24px', fontWeight: 700 },
  h5: { fontSize: '20px', fontWeight: 700 },
  h6: { fontSize: '17px', fontWeight: 700 },
  h7: { fontSize: '14px', fontWeight: 700 },
  h8: { fontSize: '12px', fontWeight: 700 },
  h9: { fontSize: '10px', fontWeight: 700 },
  p1: { fontSize: '17px', fontWeight: 400 },
  p2: { fontSize: '14px', fontWeight: 400 },
  p3: { fontSize: '12px', fontWeight: 400 },
  p4: { fontSize: '10px', fontWeight: 400 },
} as const satisfies Record<string, CSSProperties>;

export type TypographyLevel = keyof typeof typographyStyles;

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  level?: TypographyLevel;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
  {
    as = 'div',
    className,
    level = 'p1',
    style,
    ...props
  },
  ref,
) {
  return createElement(as, {
    ...props,
    className: cn(className),
    ref,
    style: {
      ...typographyStyles[level],
      ...style,
    },
  });
});
