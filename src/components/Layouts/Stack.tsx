import { extractStyleProps } from '@components/core/extractStyleProps';
import type { FlexProperty } from '@components/core/flexProps.type';
import { parseStyleProps } from '@components/core/parseStyleProps';
import type { StrictPropsWithChildren } from '@utils/types';
import { css } from '@emotion/react';

interface StackProps {
  align?: FlexProperty['AlignItems'];
  justify?: FlexProperty['JustifyContent'];
  gap?: number;
}

export default function Stack({
  align = 'stretch',
  justify = 'flex-start',
  gap = 16,
  children,
  ...props
}: StrictPropsWithChildren<StackProps>) {
  const { styleProps, rest } = extractStyleProps(props);
  const parsedStyleProps = parseStyleProps(styleProps);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        ${parsedStyleProps};
      `}
      style={{
        alignItems: align,
        justifyContent: justify,
        rowGap: gap,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
