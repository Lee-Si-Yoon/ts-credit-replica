import type { OverridableProps, StrictPropsWithChildren } from '@utils/types';
import { useTheme } from '@emotion/react';
import type { HeadingElements, TextBaseProps } from '../text.types';
import { titleStyle } from './styles';

export const DEFAULT_ELEMENT = 'h1' as const;

type TitleProps<T extends HeadingElements = typeof DEFAULT_ELEMENT> =
  OverridableProps<T, StrictPropsWithChildren<TextBaseProps>>;

export default function Title<
  T extends HeadingElements = typeof DEFAULT_ELEMENT,
>({ as, children, ...props }: TitleProps<T>) {
  const theme = useTheme();
  const Component = as ?? DEFAULT_ELEMENT;

  return (
    <Component
      css={titleStyle({
        as,
        theme,
        props,
      })}
      {...props}
    >
      {children}
    </Component>
  );
}
