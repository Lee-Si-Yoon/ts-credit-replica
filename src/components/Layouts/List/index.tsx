import type { ComponentWithStyleProps } from '@components/core/component.type';
import { extractStyleProps } from '@components/core/extractStyleProps';
import { parseStyleProps } from '@components/core/parseStyleProps';
import { css } from '@emotion/react';
import ListRow from './Row';

interface ListProps {
  gap?: number;
}

function List({
  children,
  gap = 16,
  ...props
}: ComponentWithStyleProps<ListProps>) {
  const { styleProps, rest } = extractStyleProps<ListProps>(props);
  const parsedStyleProps = parseStyleProps(styleProps);

  return (
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        list-style-type: none;
        > li:not(:first-of-type) {
          margin-top: ${gap}px;
        }
        ${parsedStyleProps};
      `}
      {...rest}
    >
      {children}
    </ul>
  );
}

function Horizontal({
  children,
  gap = 16,
  ...props
}: ComponentWithStyleProps<ListProps>) {
  const { styleProps, rest } = extractStyleProps<ListProps>(props);
  const parsedStyleProps = parseStyleProps(styleProps);

  return (
    <ul
      css={css`
        display: flex;
        padding: 0;
        margin: 0;
        list-style-type: none;
        > li:not(:first-of-type) {
          margin-left: ${gap}px;
        }
        ${parsedStyleProps};
      `}
      {...rest}
    >
      {children}
    </ul>
  );
}

List.default = List;
List.Horizontal = Horizontal;
List.Row = ListRow;

export default List;
