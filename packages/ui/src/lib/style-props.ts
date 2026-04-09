import type { CSSProperties } from 'react';

type SpaceValue = CSSProperties['marginTop'];
type SizeValue = CSSProperties['width'];

export interface BoxStyleProps {
  bgColor?: CSSProperties['backgroundColor'];
  border?: CSSProperties['border'];
  borderRadius?: CSSProperties['borderRadius'];
  color?: CSSProperties['color'];
  cursor?: CSSProperties['cursor'];
  disabled?: boolean;
  h?: SizeValue;
  maxH?: SizeValue;
  maxW?: SizeValue;
  minH?: SizeValue;
  minW?: SizeValue;
  ml?: SpaceValue;
  mr?: SpaceValue;
  mt?: SpaceValue;
  mb?: SpaceValue;
  overflowX?: CSSProperties['overflowX'];
  overflowY?: CSSProperties['overflowY'];
  pl?: SpaceValue;
  pr?: SpaceValue;
  pt?: SpaceValue;
  pb?: SpaceValue;
  textAlign?: CSSProperties['textAlign'];
  w?: SizeValue;
}

export function toBoxStyles(props: BoxStyleProps): CSSProperties {
  const disabledStyles = props.disabled
    ? {
        opacity: 0.4,
        pointerEvents: 'none' as const,
        userSelect: 'none' as const,
      }
    : null;

  return {
    backgroundColor: props.bgColor,
    border: props.border,
    borderRadius: props.borderRadius,
    color: props.color,
    cursor: props.cursor,
    height: props.h,
    marginBottom: props.mb,
    marginLeft: props.ml,
    marginRight: props.mr,
    marginTop: props.mt,
    maxHeight: props.maxH,
    maxWidth: props.maxW,
    minHeight: props.minH,
    minWidth: props.minW,
    overflowX: props.overflowX,
    overflowY: props.overflowY,
    paddingBottom: props.pb,
    paddingLeft: props.pl,
    paddingRight: props.pr,
    paddingTop: props.pt,
    textAlign: props.textAlign,
    width: props.w,
    ...disabledStyles,
  };
}
