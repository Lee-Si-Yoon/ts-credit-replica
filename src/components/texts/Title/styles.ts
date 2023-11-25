import { css, type Theme } from '@emotion/react';
import type { HeadingElements } from '../text.types';

interface ThemeTitleStyleProps {
  theme: Theme;
  as: HeadingElements;
}

export function getThemeTitleStyle({ theme, as }: ThemeTitleStyleProps) {
  if (as !== undefined) {
    const themeHeadingStyles = theme.headings.sizes[as];

    return css`
      font-family: ${theme.headings.fontFamily};
      font-size: ${themeHeadingStyles.fontSize};
      font-weight: ${themeHeadingStyles.fontWeight ??
      theme.headings.fontWeight};
      line-height: ${themeHeadingStyles.lineHeight};
    `;
  } else {
    return null;
  }
}
