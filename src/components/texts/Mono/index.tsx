import type { OverridableProps, StrictPropsWithChildren } from '@utils/types';
import { css, useTheme } from '@emotion/react';
import { getTextBaseStyle } from '../shared/styles';
import type {
  MonoElements,
  MonoExtendedProps,
  TextBaseProps,
} from '../text.types';
import { getBaseMonoStyle, getThemeMonoTextStyle } from './styles';

export const DEFAULT_ELEMENT = 'code' as const;

type MonoProps<T extends MonoElements = typeof DEFAULT_ELEMENT> =
  OverridableProps<T, StrictPropsWithChildren<MonoExtendedProps>>;

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
  const textBaseProps: TextBaseProps = {
    display,
    weight,
    lineHeight,
    size,
    color,
    align,
  };
  const monoBaseProps: Omit<MonoExtendedProps, keyof TextBaseProps> = {
    padding,
    backgroundColor,
    borderRadius,
  };

  return (
    <Component
      css={css`
        ${getThemeMonoTextStyle(theme)};
        ${getTextBaseStyle(textBaseProps)};
        ${getBaseMonoStyle(monoBaseProps)}
      `}
      {...props}
    >
      {children}
    </Component>
  );
}
