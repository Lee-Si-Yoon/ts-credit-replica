import type { ComponentWithStyleProps } from '@components/core/component.type';
import { extractStyleProps } from '@components/core/extractStyleProps';
import { parseStyleProps } from '@components/core/parseStyleProps';
import { css } from '@emotion/react';
import { gray } from '@radix-ui/colors';
import { ChevronRightIcon } from '@radix-ui/react-icons';

interface ListRowProps {
  rightSlot?: React.ReactNode;
  withArrow?: boolean;
  onClick?: () => void;
}

// TODO: inject onPress animation from outside(ripple & scale)
function ListRow({
  children,
  rightSlot,
  withArrow,
  onClick,
  ...props
}: ComponentWithStyleProps<ListRowProps>) {
  const { styleProps, rest } = extractStyleProps<ListRowProps>(props);
  const parsedStyleProps = parseStyleProps(styleProps);

  return (
    <li
      role="presentation"
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: ${typeof onClick === 'function' && 'pointer'};
        ${parsedStyleProps};
      `}
      onClick={onClick}
      {...rest}
    >
      {children}
      {rightSlot}
      {withArrow === true && rightSlot === undefined && (
        <ChevronRightIcon
          css={css`
            width: 24px;
            height: 24px;
            > path {
              stroke-width: 1px;
              fill: ${gray.gray6}
            },
          `}
        />
      )}
    </li>
  );
}

export default ListRow;
