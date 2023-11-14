import type { OverridableProps, StrictPropsWithChildren } from '@utils/types';
import { css, useTheme } from '@emotion/react';
import { getTextBaseStyle, getThemeTextStyle } from '../shared/styles';
import type { HeadingElements, TextBaseProps } from '../text.types';
import { getThemeTitleStyle } from './styles';

export const DEFAULT_ELEMENT = 'h1' as const;

type TitleProps<T extends HeadingElements = typeof DEFAULT_ELEMENT> =
  OverridableProps<T, StrictPropsWithChildren<TextBaseProps>>;

export default function Title<
  T extends HeadingElements = typeof DEFAULT_ELEMENT,
>({
  display,
  weight,
  lineHeight,
  size,
  color,
  align,
  as,
  children,
  ...props
}: TitleProps<T>) {
  const theme = useTheme();
  const Component = as ?? DEFAULT_ELEMENT;
  const textBaseProps: TextBaseProps = {
    display,
    weight,
    lineHeight,
    size,
    color,
    align,
  };

  return (
    <Component
      css={css`
        ${getThemeTextStyle(theme)};
        ${getTextBaseStyle(textBaseProps)};
        ${getThemeTitleStyle({ theme, as: Component })};
      `}
      {...props}
    >
      {children}
    </Component>
  );
}
