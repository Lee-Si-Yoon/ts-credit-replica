import type { CSSProperties } from '@emotion/serialize';

export type LayoutStyleProps = Pick<
  CSSProperties,
  | 'margin'
  | 'padding'
  | 'width'
  | 'minWidth'
  | 'maxWidth'
  | 'height'
  | 'minHeight'
  | 'maxHeight'
  | 'position'
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'inset'
  | 'display'
>;

export type ShapeStyleProps = Pick<
  CSSProperties,
  'borderRadius' | 'backgroundColor' | 'opacity' | 'color'
>;

export type StyleProps = LayoutStyleProps & ShapeStyleProps;

export type TextBaseProps = Pick<
  CSSProperties,
  'lineHeight' | 'fontWeight' | 'fontSize' | 'textAlign'
>;
