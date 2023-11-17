import { StoriesComponentItem, StoriesComponentTableType } from './types';

export function generateComponentControl<T>({
  description,
  defaultValue,
  disable,
  table,
  type,
}: {
  description: string;
  disable: boolean;
  defaultValue?: T;
  table?: StoriesComponentTableType<T>;
  type?: string;
}): StoriesComponentItem<T> {
  return {
    description,
    control: {
      disable,
      type,
    },
    defaultValue,
    table,
  };
}
