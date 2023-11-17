import type { Combine, StrictPropsWithChildren } from '@utils/types';
import type { StyleProps } from './extractStyleProps';

export type ComponentWithStyleProps<T> = StrictPropsWithChildren<
  Combine<T, StyleProps>
>;
