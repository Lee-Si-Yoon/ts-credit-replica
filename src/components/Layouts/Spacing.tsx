import { parseStyleProps } from '@components/core/parseStyleProps';
import type { StyleProps } from '@components/core/types';
import { css } from '@emotion/react';

interface SpacingProps {
  size: number;
}

export default function Spacing({ size, ...props }: SpacingProps & StyleProps) {
  const parsedStyleProps = parseStyleProps(props);

  return (
    <div
      css={css`
        flex: none;
        ${parsedStyleProps};
      `}
      style={{
        height: size,
      }}
    />
  );
}
