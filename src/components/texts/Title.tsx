import type { ElementType } from 'react';
import type { OverridableProps } from '@utils/types';
import { css } from '@emotion/react';
import type { TextBaseProps } from './model';

export const DEFAULT_ELEMENT = 'h1' as const;

type TextProps<T extends ElementType = typeof DEFAULT_ELEMENT> =
  OverridableProps<T, TextBaseProps>;

export default function Title<T extends ElementType = typeof DEFAULT_ELEMENT>({
  display,
  lineHeight,
  weight,
  size,
  color,
  align,
  as,
  children,
  ...props
}: TextProps<T>) {
  const Component = as ?? DEFAULT_ELEMENT;

  return (
    <Component
      css={css`
        display: ${display};
        font-weight: ${weight};
        line-height: ${lineHeight};
        font-size: ${typeof size === 'string' ? size : `${size}px`};
        color: ${color};
        text-align: ${align};
      `}
      {...props}
    >
      {children}
    </Component>
  );
}
