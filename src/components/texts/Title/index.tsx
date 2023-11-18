import type { ComponentWithStyleProps } from '@components/core/component.type';
import { extractStyleProps } from '@components/core/extractStyleProps';
import { parseStyleProps } from '@components/core/parseStyleProps';
import type { StyleProps, TextBaseProps } from '@components/core/types';
import type { Combine, OverridableProps } from '@utils/types';
import { css, useTheme } from '@emotion/react';
import { getTextBaseStyle, getThemeTextStyle } from '../shared/styles';
import type { HeadingElements } from '../text.types';
import { getThemeTitleStyle } from './styles';

export const DEFAULT_ELEMENT = 'h1' as const;

type TitleProps<T extends HeadingElements = typeof DEFAULT_ELEMENT> =
  OverridableProps<T, ComponentWithStyleProps<TextBaseProps>>;

export default function Title<
  T extends HeadingElements = typeof DEFAULT_ELEMENT,
>({
  display,
  fontWeight,
  lineHeight,
  fontSize,
  color,
  textAlign,
  as,
  children,
  ...props
}: TitleProps<T>) {
  const theme = useTheme();
  const Component = as ?? DEFAULT_ELEMENT;
  const textBaseProps: Combine<TextBaseProps, StyleProps> = {
    display,
    fontWeight,
    lineHeight,
    fontSize,
    color,
    textAlign,
  };
  const { styleProps, rest } = extractStyleProps(props);
  const parsedStyleProps = parseStyleProps(styleProps);

  return (
    <Component
      css={css`
        ${getThemeTextStyle(theme)};
        ${getTextBaseStyle(textBaseProps)};
        ${getThemeTitleStyle({ theme, as: Component })};
        ${JSON.stringify(styleProps)};
        ${parsedStyleProps};
      `}
      {...rest}
    >
      {children}
    </Component>
  );
}
