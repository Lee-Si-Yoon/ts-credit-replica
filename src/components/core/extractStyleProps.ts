import type { LayoutStyleProps } from './layoutProps.types';
import type { ShapeStyleProps } from './shapeProps.types';

export type StyleProps = LayoutStyleProps & ShapeStyleProps;

export function extractStyleProps<T extends Record<string, unknown>>(
  others: StyleProps & T
): { styleProps: StyleProps; rest: T } {
  const {
    margin,
    padding,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    position,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    borderRadius,
    backgroundColor,
    opacity,
    color,
    ...rest
  } = others;

  const styleProps = {
    margin,
    padding,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    position,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    borderRadius,
    backgroundColor,
    opacity,
    color,
  };

  return { styleProps, rest: rest as unknown as T };
}
