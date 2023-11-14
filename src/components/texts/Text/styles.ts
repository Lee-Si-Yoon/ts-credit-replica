import { css } from '@emotion/react';
import type { TruncateDirections } from '../text.types';

export const inheritedTextStyle = css`
  font-weight: inherit;
  line-height: inherit;
  font-size: inherit;
`;

export function getTruncatedTextStyle(truncate: TruncateDirections) {
  return css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    direction: ${truncate === 'start' && 'rtl'};
    text-align: ${truncate === 'start' && 'right'};
  `;
}

export function getLineClampedTextStyle(lineClamp: number) {
  return css`
    -webkit-line-clamp: ${lineClamp};
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}
