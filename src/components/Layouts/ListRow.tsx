import { css } from '@emotion/react';
import { gray } from '@radix-ui/colors';
import { ChevronRightIcon } from '@radix-ui/react-icons';

interface ListRowProps {
  content: NonNullable<React.ReactNode>;
  rightSlot?: React.ReactNode;
  withArrow?: boolean;
  onClick?: () => void;
}

// TODO: inject onPress animation from outside(ripple & scale)
function ListRow({
  content,
  rightSlot,
  withArrow,
  onClick,
  ...rest
}: ListRowProps) {
  return (
    <li
      role="presentation"
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: ${typeof onClick === 'function' && 'pointer'};
      `}
      onClick={onClick}
      {...rest}
    >
      {content}
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
