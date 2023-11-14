import { css, type Theme } from '@emotion/react';
import type { TextBaseProps } from '../text.types';

export function getThemeTextStyle(theme: Theme) {
  return css`
    font-family: ${theme.fontFamily};
  `;
}

export function getTextBaseStyle(props: TextBaseProps) {
  const { display, weight, lineHeight, size, color, align } = props;

  return css`
    display: ${display};
    font-weight: ${weight};
    line-height: ${lineHeight};
    font-size: ${size};
    color: ${color};
    text-align: ${align};
  `;
}
