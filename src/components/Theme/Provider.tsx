import type { StrictPropsWithChildren } from '@utils/types';
import { ThemeProvider as EmotionProvider } from '@emotion/react';
import type { Theme } from './theme.types';

export const scale = 1;

export const theme: Theme = {
  scale,
  white: 'white',
  black: 'black',
  headings: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    fontWeight: '700',
    sizes: {
      h1: {
        fontSize: `calc(2.125rem * ${scale})`,
        lineHeight: '1.3',
      },
      h2: {
        fontSize: `calc(1.625rem * ${scale})`,
        lineHeight: '1.35',
      },
      h3: {
        fontSize: `calc(1.375rem * ${scale})`,
        lineHeight: '1.4',
      },
      h4: {
        fontSize: `calc(1.125rem * ${scale})`,
        lineHeight: '1.45',
      },
      h5: {
        fontSize: `calc(1rem * ${scale})`,
        lineHeight: '1.5',
      },
      h6: {
        fontSize: `calc(0.875rem * ${scale})`,
        lineHeight: '1.5',
      },
    },
  },
};

export function ThemeProvider({ children }: StrictPropsWithChildren) {
  return <EmotionProvider theme={theme}>{children}</EmotionProvider>;
}
