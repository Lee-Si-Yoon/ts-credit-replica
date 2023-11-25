import type { CSSProperties } from '@emotion/serialize';

export function extractStyleProps<T extends Record<string, unknown>>(
  others: CSSProperties & T
) {
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

  return { styleProps, rest: rest as T };
}
