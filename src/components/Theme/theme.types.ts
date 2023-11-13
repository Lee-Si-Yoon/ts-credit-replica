import type { CSSProperties } from '@emotion/serialize';

export interface HeadingStyle {
  fontSize: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
  lineHeight: CSSProperties['lineHeight'];
}

export interface Theme {
  scale: number;

  white: CSSProperties['color'];
  black: CSSProperties['color'];

  headings: {
    fontFamily: CSSProperties['fontFamily'];
    fontWeight: CSSProperties['fontWeight'];
    sizes: {
      h1: HeadingStyle;
      h2: HeadingStyle;
      h3: HeadingStyle;
      h4: HeadingStyle;
      h5: HeadingStyle;
      h6: HeadingStyle;
    };
  };
}
