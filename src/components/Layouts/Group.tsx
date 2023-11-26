import React from 'react';
import { extractStyleProps } from '@components/core/extractStyleProps';
import type { FlexProperty } from '@components/core/flexProps.type';
import { parseStyleProps } from '@components/core/parseStyleProps';
import type { StyleProps } from '@components/core/types';
import type { Combine } from '@utils/types';
import { css } from '@emotion/react';

interface GroupProps {
  /**
   * not used StrictPropsWithChildren,
   * because React.cloneElement accepts React.ReactElement as parameter
   */
  children: NonNullable<React.ReactElement[] | React.ReactElement>;
  align?: FlexProperty['AlignItems'];
  justify?: FlexProperty['JustifyContent'];
  wrap?: FlexProperty['FlexWrap'];
  gap?: number;
  /**
   * @important
   * grow prop works correctly with React.ReactElement only
   * string, number, React.Fragments will not work
   *
   * @example
   * // this works
   * <Group grow={true}>
   *   <div/>
   *   <div/>
   * </Group>
   *
   * // this does not works
   * <Group grow={true}>
   *   <>
   *     <div/>
   *     <div/>
   *   </>
   *   {200}
   * </Group>
   */
  grow?: boolean;
}

export default function Group({
  align = 'center',
  justify = 'flex-start',
  wrap = 'wrap',
  gap = 16,
  grow = true,
  ...props
}: Combine<GroupProps, StyleProps>) {
  const { styleProps, rest } = extractStyleProps<GroupProps>(props);
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
      {grow === true
        ? injectFlexGrowToChildren(props.children as React.ReactElement)
        : props.children}
    </div>
  );
}

function injectFlexGrowToChildren(children: React.ReactElement) {
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      ...child.props,
      style: { ...child.props.style, flexGrow: 1 },
    });
  });
}
