import type { CSSInterpolation } from '@emotion/serialize';
import type { StyleProps } from './extractStyleProps';

export function parseStyleProps(styleProps: StyleProps) {
  const parsedKeyValues = Object.entries(styleProps)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => {
      return value !== undefined;
    })
    .map(([key, value]) => {
      return `${key}: ${value}`;
    })
    .join('; ');

  return `${parsedKeyValues};` as CSSInterpolation;
}
