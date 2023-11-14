import { css, type Theme } from '@emotion/react';
import type { MonoExtendedProps, TextBaseProps } from '../text.types';

export function getThemeMonoTextStyle(theme: Theme) {
  return css`
    font-family: ${theme.fontFamilyMonospace};
  `;
}

export const getBaseMonoStyle = (
  props: Omit<MonoExtendedProps, keyof TextBaseProps>
) => {
  return css`
    margin: 0;
    overflow: auto;
    background-color: ${props.backgroundColor};
    border-radius: ${props.borderRadius};
    padding: ${props.padding};
  `;
};
