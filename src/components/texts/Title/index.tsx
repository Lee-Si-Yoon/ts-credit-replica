import type { OverridableProps, StrictPropsWithChildren } from '@utils/types';
import { useTheme } from '@emotion/react';
import type { HeadingElements, TextBaseProps } from '../text.types';
import { titleStyle } from './styles';

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
  const theme = useTheme();
  const Component = as ?? DEFAULT_ELEMENT;

  return (
    <Component
      css={titleStyle({
        as,
        theme,
        props: { display, weight, lineHeight, size, color, align },
      })}
      {...props}
    >
      {children}
    </Component>
  );
}
