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

export type TruncateDirections = 'start' | 'end';

export interface TextExtendedProps extends TextBaseProps {
  span?: boolean;
  lineClamp?: number;
  inherit?: boolean;
  truncate?: TruncateDirections;
}

export type MonoElements = 'code' | 'kbd' | 'pre' | 'samp';

export interface MonoExtendedProps extends TextBaseProps {
  block?: boolean;
  backgroundColor?: CSSProperties['backgroundColor'];
  /** TODO inject layout related styling from other interface */
  padding?: CSSProperties['padding'];
  borderRadius?: CSSProperties['borderRadius'];
}
