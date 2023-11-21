import { extractStyleProps } from '@components/core/extractStyleProps';
import type { FlexProperty } from '@components/core/flexProps.type';
import { parseStyleProps } from '@components/core/parseStyleProps';
import type { StrictPropsWithChildren } from '@utils/types';
import { css } from '@emotion/react';

/**
 * TODO
 * 1. inject flex:1 to children with grow prop(boolean)
 */
interface GroupProps {
  align?: FlexProperty['AlignItems'];
  justify?: FlexProperty['JustifyContent'];
  wrap?: FlexProperty['FlexWrap'];
  gap?: number;
}

export default function Group({
  align = 'center',
  justify = 'flex-start',
  wrap = 'wrap',
  gap = 16,
  children,
  ...props
}: StrictPropsWithChildren<GroupProps>) {
  const { styleProps, rest } = extractStyleProps(props);
  const parsedStyleProps = parseStyleProps(styleProps);

  return (
    <div
      css={css`
        display: flex;
        ${parsedStyleProps};
      `}
      style={{
        alignItems: align,
        justifyContent: justify,
        columnGap: gap,
        flexWrap: wrap,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
