import type { CSSProperties } from '@emotion/serialize';

export interface TextBaseProps {
  display?: CSSProperties['display'];
  lineHeight?: CSSProperties['lineHeight'];
  weight?: CSSProperties['fontWeight'];
  size?: CSSProperties['fontSize'];
  color?: CSSProperties['color'];
  align?: CSSProperties['textAlign'];
}

export type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
