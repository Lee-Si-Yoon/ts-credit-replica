import type React from 'react';

export type Combine<T, K> = T & Omit<K, keyof T>;

export type CombineElementProps<
  T extends React.ElementType,
  K = unknown,
> = Combine<K, React.ComponentPropsWithoutRef<T>>;

export type OverridableProps<T extends React.ElementType, K = unknown> = {
  as?: T;
} & CombineElementProps<T, K>;

export type StrictPropsWithChildren<P = unknown> = P & {
  children: NonNullable<React.ReactNode>;
};
