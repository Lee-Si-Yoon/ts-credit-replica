import type { Entries, ValueOf } from '@utils/types';
import type { CSSInterpolation, CSSProperties } from '@emotion/serialize';

export function parseStyleProps(styleProps: CSSProperties) {
  const parsedKeyValues = (
    Object.entries(styleProps) as Entries<
      Record<keyof CSSProperties, ValueOf<CSSProperties>>
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
