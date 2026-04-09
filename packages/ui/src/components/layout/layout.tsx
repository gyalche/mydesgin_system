import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@hamro-design-system/utils';
import type { BoxStyleProps } from '../../lib/style-props';
import { toBoxStyles } from '../../lib/style-props';

type BaseLayoutProps = Omit<HTMLAttributes<HTMLDivElement>, keyof BoxStyleProps> & BoxStyleProps;

export interface FlexProps extends BaseLayoutProps {
  alignItems?: React.CSSProperties['alignItems'];
  direction?: React.CSSProperties['flexDirection'];
  flex?: React.CSSProperties['flex'];
  gap?: React.CSSProperties['gap'];
  justifyContent?: React.CSSProperties['justifyContent'];
  wrap?: React.CSSProperties['flexWrap'];
}

export interface BlockProps extends BaseLayoutProps {}

export interface ItemProps extends BaseLayoutProps {
  flex?: React.CSSProperties['flex'];
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  {
    alignItems = 'flex-start',
    className,
    direction = 'row',
    flex,
    gap = 0,
    justifyContent = 'flex-start',
    style,
    wrap = 'nowrap',
    ...props
  },
  ref,
) {
  return (
    <div
      {...props}
      className={cn(className)}
      ref={ref}
      style={{
        alignItems,
        display: 'flex',
        flex,
        flexDirection: direction,
        flexWrap: wrap,
        gap,
        justifyContent,
        ...toBoxStyles(props),
        ...style,
      }}
    />
  );
});

export const Block = forwardRef<HTMLDivElement, BlockProps>(function Block(
  {
    className,
    style,
    ...props
  },
  ref,
) {
    return (
      <div
        {...props}
        className={cn(className)}
        ref={ref}
        style={{
          display: 'block',
          ...toBoxStyles(props),
          ...style,
        }}
      />
    );
  },
);

export const Item = forwardRef<HTMLDivElement, ItemProps>(function Item(
  {
    className,
    flex = '0 1 auto',
    style,
    ...props
  },
  ref,
) {
  return (
    <div
      {...props}
      className={cn(className)}
      ref={ref}
      style={{
        flex,
        ...toBoxStyles(props),
        ...style,
      }}
    />
  );
});

export const Layout = {
  Block,
  Flex,
  Item,
};
