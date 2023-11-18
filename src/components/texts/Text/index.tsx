import type { ComponentWithStyleProps } from '@components/core/component.type';
import { extractStyleProps } from '@components/core/extractStyleProps';
import { parseStyleProps } from '@components/core/parseStyleProps';
import type { StyleProps } from '@components/core/types';
import type { Combine, OverridableProps } from '@utils/types';
import { css, useTheme } from '@emotion/react';
import { getTextBaseStyle, getThemeTextStyle } from '../shared/styles';
import type { TextExtendedProps } from '../text.types';
import {
  getLineClampedTextStyle,
  getTruncatedTextStyle,
  inheritedTextStyle,
} from './styles';

export const DEFAULT_ELEMENT = 'p' as const;

type TextProps<T extends React.ElementType = typeof DEFAULT_ELEMENT> =
  OverridableProps<T, ComponentWithStyleProps<TextExtendedProps>>;

export default function Text<
  T extends React.ElementType = typeof DEFAULT_ELEMENT,
>({
  display,
  fontWeight,
  lineHeight,
  fontSize,
  color,
  textAlign,
  inherit,
  truncate,
  lineClamp,
  as,
  span = false,
  children,
  ...props
}: TextProps<T>) {
  const theme = useTheme();
  const Component = span === true ? 'span' : as ?? DEFAULT_ELEMENT;
  const textBaseProps: Combine<TextExtendedProps, StyleProps> = {
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
        ${lineClamp !== undefined &&
        lineClamp > 0 &&
        getLineClampedTextStyle(lineClamp)};
        ${truncate !== undefined && getTruncatedTextStyle(truncate)};
        ${inherit === true && inheritedTextStyle};
        ${parsedStyleProps};
      `}
      {...rest}
    >
      {children}
    </Component>
  );
}
