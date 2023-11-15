import type { CSSProperties } from '@emotion/serialize';

export interface TextBaseProps {
  lineHeight?: CSSProperties['lineHeight'];
  weight?: CSSProperties['fontWeight'];
  size?: CSSProperties['fontSize'];
  align?: CSSProperties['textAlign'];
}
