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

export type ValueOf<T> = T[keyof T];

/**
 * @example
 * type A = {
 *   id: number;
 *   name: string;
 * };
 *
 * interface Template {
 *   STEP_A: A;
 * }
 *
 * const AList: Template = {
 *   STEP_A: { id: 0, name: '0' },
 * };
 *
 * (Object.entries(AList) as Entries<Template>).map(([key, value]) => {
 *   console.log(key, value); // key: string, value: A
 * });
 */
export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
