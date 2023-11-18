import type { Combine, StrictPropsWithChildren } from '@utils/types';
import type { StyleProps } from './types';

export type ComponentWithStyleProps<T> = StrictPropsWithChildren<
  Combine<T, StyleProps>
>;
