import type { OverridableProps, StrictPropsWithChildren } from '@utils/types';
import { css, useTheme } from '@emotion/react';
import { getTextBaseStyle, getThemeTextStyle } from '../shared/styles';
import type { TextBaseProps, TextExtendedProps } from '../text.types';
import {
  getLineClampedTextStyle,
  getTruncatedTextStyle,
  inheritedTextStyle,
} from './styles';

export const DEFAULT_ELEMENT = 'p' as const;

type TextProps<T extends React.ElementType = typeof DEFAULT_ELEMENT> =
  OverridableProps<T, StrictPropsWithChildren<TextExtendedProps>>;

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
        ${lineClamp !== undefined &&
        lineClamp > 0 &&
        getLineClampedTextStyle(lineClamp)};
        ${truncate !== undefined && getTruncatedTextStyle(truncate)};
        ${inherit === true && inheritedTextStyle};
      `}
      {...props}
    >
      {children}
    </Component>
  );
}
