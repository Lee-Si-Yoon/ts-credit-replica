import type { Entries, ValueOf } from '@utils/types';
import type { CSSInterpolation } from '@emotion/serialize';
import type { StyleProps } from './types';

export function parseStyleProps(styleProps: StyleProps) {
  const parsedKeyValues = (
    Object.entries(styleProps) as Entries<
      Record<keyof StyleProps, ValueOf<StyleProps>>
    >
  )
    .filter(([_, value]) => {
      return value !== undefined;
    })
    .map(([key, value]) => {
      return `${key}: ${value}`;
    })
    .join('; ');

  return `${parsedKeyValues};` as CSSInterpolation;
}
