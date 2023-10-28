import { css } from '@emotion/react';

export default function Spacing({ size }: { size: number }) {
  return (
    <div
      css={css`
        flex: none;
      `}
      style={{
        height: size,
      }}
    />
  );
}
