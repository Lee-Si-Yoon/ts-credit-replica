import type { OverridableProps, StrictPropsWithChildren } from '@utils/types';
import { useTheme } from '@emotion/react';
import type { TextExtendedProps } from '../text.types';
import { textStyles } from './styles';

export const DEFAULT_ELEMENT = 'p' as const;

type TextProps<T extends React.ElementType = typeof DEFAULT_ELEMENT> =
  OverridableProps<T, StrictPropsWithChildren<TextExtendedProps>>;

export default function Text<
  T extends React.ElementType = typeof DEFAULT_ELEMENT,
>({ as, children, ...props }: TextProps<T>) {
  const theme = useTheme();
  const Component = props.span === true ? 'span' : as ?? DEFAULT_ELEMENT;

  return (
    <Component css={textStyles({ theme, as: Component, props })} {...props}>
      {children}
    </Component>
  );
}
