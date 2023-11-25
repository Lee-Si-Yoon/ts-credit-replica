import type { ComponentWithStyleProps } from '@components/core/component.type';
import { extractStyleProps } from '@components/core/extractStyleProps';
import { parseStyleProps } from '@components/core/parseStyleProps';
import type { StyleProps, TextBaseProps } from '@components/core/types';
import type { Combine, OverridableProps } from '@utils/types';
import { css, useTheme } from '@emotion/react';
import { getTextBaseStyle, getThemeTextStyle } from '../shared/styles';
import type { MonoElements, TextExtendedProps } from '../text.types';
import { getBaseMonoStyle, getThemeMonoTextStyle } from './monoStyles';
import {
  getLineClampedTextStyle,
  getTruncatedTextStyle,
  inheritedTextStyle,
} from './styles';

export const DEFAULT_ELEMENT = 'p' as const;

type TextProps<T extends React.ElementType = typeof DEFAULT_ELEMENT> =
  OverridableProps<T, ComponentWithStyleProps<TextExtendedProps>>;

function Text<T extends React.ElementType = typeof DEFAULT_ELEMENT>({
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
  children,
  ...props
}: TextProps<T>) {
  const theme = useTheme();
  const Component = as ?? DEFAULT_ELEMENT;
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

export const DEFAULT_MONO_ELEMENT = 'code' as const;

function Mono<T extends MonoElements = typeof DEFAULT_MONO_ELEMENT>({
  display,
  fontWeight,
  lineHeight,
  fontSize,
  color,
  textAlign,
  as,
  children,
  padding,
  backgroundColor,
  borderRadius,
  ...props
}: TextProps<T>) {
  const theme = useTheme();
  const Component = as ?? DEFAULT_MONO_ELEMENT;
  const textBaseProps: Combine<TextBaseProps, StyleProps> = {
    fontWeight,
    lineHeight,
    fontSize,
    color,
    textAlign,
  };
  const monoBaseProps = {
    padding,
    backgroundColor,
    borderRadius,
  };
  const { styleProps, rest } = extractStyleProps(props);
  const parsedStyleProps = parseStyleProps(styleProps);

  return (
    <Component
      css={css`
        ${getThemeMonoTextStyle(theme)};
        ${getTextBaseStyle(textBaseProps)};
        ${getBaseMonoStyle(monoBaseProps)};
        ${parsedStyleProps};
      `}
      {...rest}
    >
      {children}
    </Component>
  );
}

Text.Default = Text;
Text.Mono = Mono;

export default Text;
