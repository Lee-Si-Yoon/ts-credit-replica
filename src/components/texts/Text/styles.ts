import { css, type Theme } from '@emotion/react';
import type { TextExtendedProps } from '../text.types';

interface ThemeTextStyleProps {
  theme: Theme;
  as?: React.ElementType;
}

function themeTextStyle({ theme, as }: ThemeTextStyleProps) {
  if (as !== undefined) {
    return css`
      font-family: ${theme.fontFamily};
    `;
  } else {
    return null;
  }
}

interface TextStyleProps extends ThemeTextStyleProps {
  props: TextExtendedProps;
}

function textBaseStyle({ props, theme, as }: TextStyleProps) {
  const themeStyles = themeTextStyle({ theme, as });
  const { display, weight, lineHeight, size, color, align } = props;

  return css`
    ${themeStyles};
    display: ${display};
    font-weight: ${weight};
    line-height: ${lineHeight};
    font-size: ${size};
    color: ${color};
    text-align: ${align};
  `;
}

function inheritedTextStyle(props: TextExtendedProps) {
  const { inherit } = props;

  return css`
    font-weight: ${inherit === true && 'inherit'};
    line-height: ${inherit === true && 'inherit'};
    font-size: ${inherit === true && 'inherit'};
  `;
}

function truncatedTextStyle(props: TextExtendedProps) {
  const { truncate } = props;

  return css`
    overflow: ${truncate !== undefined && 'hidden'};
    text-overflow: ${truncate !== undefined && 'ellipsis'};
    white-space: ${truncate !== undefined && 'nowrap'};
    direction: ${truncate === 'start' && 'rtl'};
    text-align: ${truncate === 'start' && 'right'};
  `;
}

function lineClampedTextStyle(props: TextExtendedProps) {
  const { lineClamp } = props;

  return css`
    -webkit-line-clamp: ${lineClamp};
    -webkit-box-orient: ${lineClamp !== undefined && 'vertical'};
    display: ${lineClamp !== undefined && '-webkit-box'};
    overflow: ${lineClamp !== undefined && 'hidden'};
    text-overflow: ${lineClamp !== undefined && 'ellipsis'};
  `;
}

export function textStyles({ props, theme, as }: TextStyleProps) {
  const themeStyles = themeTextStyle({ theme, as });
  const baseStyles = textBaseStyle({ theme, as, props });
  const inheritStyles = inheritedTextStyle(props);
  const truncatedStyles = truncatedTextStyle(props);
  const lineClampedStyles = lineClampedTextStyle(props);

  return css`
    ${themeStyles};
    ${baseStyles};
    ${inheritStyles};
    ${truncatedStyles};
    ${lineClampedStyles};
  `;
}
