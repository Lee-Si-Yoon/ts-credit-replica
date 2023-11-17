import type { ComponentWithStyleProps } from '@components/core/componentWithStyleProps';
import {
  extractStyleProps,
  type StyleProps,
} from '@components/core/extractStyleProps';
import { parseStyleProps } from '@components/core/parseStyleProps';
import type { TextBaseProps } from '@components/core/textBaseProps.types';
import type { Combine, OverridableProps } from '@utils/types';
import { css, useTheme } from '@emotion/react';
import { getTextBaseStyle } from '../shared/styles';
import type { MonoElements, MonoExtendedProps } from '../text.types';
import { getBaseMonoStyle, getThemeMonoTextStyle } from './styles';

export const DEFAULT_ELEMENT = 'code' as const;

type MonoProps<T extends MonoElements = typeof DEFAULT_ELEMENT> =
  OverridableProps<T, ComponentWithStyleProps<MonoExtendedProps>>;

export default function Mono<T extends MonoElements = typeof DEFAULT_ELEMENT>({
  display,
  weight,
  lineHeight,
  size,
  color,
  align,
  as,
  children,
  padding,
  backgroundColor,
  borderRadius,
  block,
  ...props
}: MonoProps<T>) {
  const theme = useTheme();
  const Component = block === true ? 'pre' : as ?? DEFAULT_ELEMENT;
  const textBaseProps: Combine<TextBaseProps, StyleProps> = {
    weight,
    lineHeight,
    size,
    color,
    align,
  };
  const monoBaseProps: StyleProps = {
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
