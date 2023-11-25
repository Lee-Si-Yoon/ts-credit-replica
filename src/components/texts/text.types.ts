import type { TextBaseProps } from '@components/core/types';

export type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TruncateDirections = 'start' | 'end';

export interface TextExtendedProps extends TextBaseProps {
  lineClamp?: number;
  inherit?: boolean;
  truncate?: TruncateDirections;
}

export type MonoElements = 'code' | 'kbd' | 'pre' | 'samp';
