import type { StyleProps } from '@components/core/extractStyleProps';
import { css, type Theme } from '@emotion/react';

export function getThemeMonoTextStyle(theme: Theme) {
  return css`
    font-family: ${theme.fontFamilyMonospace};
  `;
}

export const getBaseMonoStyle = (props: StyleProps) => {
  return css`
    margin: 0;
    overflow: auto;
    background-color: ${props.backgroundColor};
    border-radius: ${props.borderRadius};
    padding: ${props.padding};
  `;
};
