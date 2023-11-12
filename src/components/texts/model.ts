import type { CSSProperties } from '@emotion/serialize';

export interface TextBaseProps {
  display?: CSSProperties['display'];
  lineHeight?: CSSProperties['lineHeight'];
  weight?: CSSProperties['fontWeight'];
  size?: CSSProperties['fontSize'];
  color?: CSSProperties['color'];
  align?: CSSProperties['textAlign'];
  children?: React.ReactNode;
}
