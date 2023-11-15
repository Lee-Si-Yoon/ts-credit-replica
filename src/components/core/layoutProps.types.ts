import type { CSSProperties } from '@emotion/serialize';

export interface LayoutStyleProps {
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];

  width?: CSSProperties['width'];
  minWidth?: CSSProperties['minWidth'];
  maxWidth?: CSSProperties['maxWidth'];
  height?: CSSProperties['height'];
  minHeight?: CSSProperties['minHeight'];
  maxHeight?: CSSProperties['maxHeight'];

  position?: CSSProperties['position'];
  top?: CSSProperties['top'];
  left?: CSSProperties['left'];
  bottom?: CSSProperties['bottom'];
  right?: CSSProperties['right'];
  inset?: CSSProperties['inset'];

  display?: CSSProperties['display'];
}
