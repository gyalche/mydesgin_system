import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { themeVars } from '@hamro-design-system/tokens';
import { cn } from '@hamro-design-system/utils';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  h?: string;
  isInvalid?: boolean | string;
  mb?: string;
  ml?: string;
  mr?: string;
  mt?: string;
  w?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    className,
    h = '300px',
    isInvalid = false,
    mb = '0',
    ml = '0',
    mr = '0',
    mt = '0',
    style,
    w = '200px',
    ...props
  },
  ref,
) {
  const invalid = isInvalid === true || isInvalid === 'true';

  return (
    <textarea
      {...props}
      className={cn(className)}
      ref={ref}
      style={{
        background: themeVars.color.bg.surface,
        border: invalid
          ? `1px solid ${themeVars.color.status.danger.border}`
          : `1px solid ${themeVars.color.border.default}`,
        borderRadius: themeVars.radius.md,
        color: themeVars.color.fg.default,
        height: h,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        padding: themeVars.space.md,
        resize: 'none',
        width: w,
        ...style,
      }}
    />
  );
});
