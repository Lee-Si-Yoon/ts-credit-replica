import { css } from '@emotion/react';

const pageLayout = css`
  max-width: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  height: auto;
`;

export function PageLayout({ children }: { children: React.ReactNode }) {
  return <div css={pageLayout}>{children}</div>;
}
