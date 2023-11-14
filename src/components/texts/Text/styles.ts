import { css, type Theme } from '@emotion/react';
import type { TextBaseProps, TruncateDirections } from '../text.types';

interface ThemeTextStyleProps {
  theme: Theme;
  as?: React.ElementType;
}

function getThemeTextStyle({ theme, as }: ThemeTextStyleProps) {
  if (as !== undefined) {
    return css`
      font-family: ${theme.fontFamily};
    `;
  } else {
    return null;
  }
}

interface TextStyleProps extends ThemeTextStyleProps {
  props: TextBaseProps;
}

export function getTextBaseStyle({ props, theme, as }: TextStyleProps) {
  const themeStyles = getThemeTextStyle({ theme, as });
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

export const inheritedTextStyle = css`
  font-weight: inherit;
  line-height: inherit;
  font-size: inherit;
`;

export function getTruncatedTextStyle(truncate: TruncateDirections) {
  return css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    direction: ${truncate === 'start' && 'rtl'};
    text-align: ${truncate === 'start' && 'right'};
  `;
}

export function getLineClampedTextStyle(lineClamp: number) {
  return css`
    -webkit-line-clamp: ${lineClamp};
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}
