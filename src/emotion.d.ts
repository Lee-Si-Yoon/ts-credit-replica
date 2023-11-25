import '@emotion/react';
import { Theme as CustomTheme } from './components/Theme/theme.types';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
