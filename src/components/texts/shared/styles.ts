import type { StyleProps, TextBaseProps } from '@components/core/types';
import type { Combine } from '@utils/types';
import { css, type Theme } from '@emotion/react';

export function getThemeTextStyle(theme: Theme) {
  return css`
    font-family: ${theme.fontFamily};
  `;
}

export function getTextBaseStyle(props: Combine<TextBaseProps, StyleProps>) {
  const { display, fontWeight, lineHeight, fontSize, color, textAlign } = props;

  return css`
    display: ${display};
    font-weight: ${fontWeight};
    line-height: ${lineHeight};
    font-size: ${fontSize};
    color: ${color};
    text-align: ${textAlign};
  `;
}
