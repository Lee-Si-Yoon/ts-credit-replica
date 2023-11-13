import { css, type Theme } from '@emotion/react';
import type { HeadingElements, TextBaseProps } from '../text.types';

interface ThemeTitleStyleProps {
  theme: Theme;
  as?: HeadingElements;
}

function themeTitleStyle({ theme, as }: ThemeTitleStyleProps) {
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

interface TitleStyleProps extends ThemeTitleStyleProps {
  props: TextBaseProps;
}

export function titleStyle({ props, theme, as }: TitleStyleProps) {
  const themeStyles = themeTitleStyle({ theme, as });
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
