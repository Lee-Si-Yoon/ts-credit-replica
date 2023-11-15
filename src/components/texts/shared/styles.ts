import type { StyleProps } from '@components/core/extractStyleProps';
import type { TextBaseProps } from '@components/core/textBaseProps.types';
import type { Combine } from '@utils/types';
import { css, type Theme } from '@emotion/react';

export function getThemeTextStyle(theme: Theme) {
  return css`
    font-family: ${theme.fontFamily};
  `;
}

export function getTextBaseStyle(props: Combine<TextBaseProps, StyleProps>) {
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
