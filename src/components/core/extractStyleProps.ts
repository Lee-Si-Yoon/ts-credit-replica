import type { StyleProps } from './types';

/**
 * @issue https://github.com/microsoft/TypeScript/issues/15300
 * if generic is set to <T extends Record<string, unknown>>
 * Index signature is missing in type error pops up
 * this is because specific interface cannot be stored in a more general interface
 * to solve this with unknown
 * 1. use specific type that can be saved into a more generic interface
 * so you will have declare type for every component, not interface
 * 2. match index signature
 * you will have to add {[key:string]: unknown} for every component
 *
 * both way is not efficient, so as a work around will have to use any to skip type checking
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractStyleProps<T extends Record<string, any>>(
  others: StyleProps & T
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
