import {
  extractStyleProps,
  type StyleProps,
} from '@components/core/extractStyleProps';
import { parseStyleProps } from '@components/core/parseStyleProps';
import type {
  Combine,
  OverridableProps,
  StrictPropsWithChildren,
} from '@utils/types';
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
  OverridableProps<
    T,
    StrictPropsWithChildren<Combine<TextExtendedProps, StyleProps>>
  >;

export default function Text<
  T extends React.ElementType = typeof DEFAULT_ELEMENT,
>({
  display,
  weight,
  lineHeight,
  size,
  color,
  align,
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
    weight,
    lineHeight,
    size,
    color,
    align,
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
