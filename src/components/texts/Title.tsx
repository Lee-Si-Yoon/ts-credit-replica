import type { OverridableProps, StrictPropsWithChildren } from '@utils/types';
import { css } from '@emotion/react';
import type { HeadingElements, TextBaseProps } from './model';

export const DEFAULT_ELEMENT = 'h1' as const;

type TextProps<T extends HeadingElements = typeof DEFAULT_ELEMENT> =
  OverridableProps<T, StrictPropsWithChildren<TextBaseProps>>;

export default function Title<
  T extends HeadingElements = typeof DEFAULT_ELEMENT,
>({
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
