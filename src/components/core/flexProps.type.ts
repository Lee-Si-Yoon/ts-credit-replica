export type Globals =
  | '-moz-initial'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'revert-layer'
  | 'unset';
type ContentPosition = 'center' | 'end' | 'flex-end' | 'flex-start' | 'start';
type ContentDistribution =
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
  | 'stretch';
type SelfPosition =
  | 'center'
  | 'end'
  | 'flex-end'
  | 'flex-start'
  | 'self-end'
  | 'self-start'
  | 'start';
type FlexWrap = Globals | 'nowrap' | 'wrap' | 'wrap-reverse';

export interface FlexProperty {
  AlignItems: Globals | SelfPosition | 'baseline' | 'normal' | 'stretch';
  JustifyContent:
    | Globals
    | ContentDistribution
    | ContentPosition
    | 'left'
    | 'normal'
    | 'right';
  FlexWrap: FlexWrap;
}
