import { KeysEnum, StoriesComponentItem } from './utils/types';
import { generateComponentControl } from '../.storybook/utils/componentControl';
import type { LayoutStyleProps } from '../components/core/layoutProps.types';
import type { ShapeStyleProps } from '../components/core/shapeProps.types';

export const layoutStylePropsController: KeysEnum<
  LayoutStyleProps,
  StoriesComponentItem<unknown>
> = {
  margin: generateComponentControl<LayoutStyleProps['margin']>({
    description: 'css margin',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  padding: generateComponentControl<LayoutStyleProps['padding']>({
    description: 'css padding',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  width: generateComponentControl<LayoutStyleProps['width']>({
    description: 'css width',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  minWidth: generateComponentControl<LayoutStyleProps['minWidth']>({
    description: 'css minWidth',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  maxWidth: generateComponentControl<LayoutStyleProps['maxWidth']>({
    description: 'css maxWidth',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  height: generateComponentControl<LayoutStyleProps['height']>({
    description: 'css height',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  minHeight: generateComponentControl<LayoutStyleProps['minHeight']>({
    description: 'css height',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  maxHeight: generateComponentControl<LayoutStyleProps['maxHeight']>({
    description: 'css maxHeight',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  position: generateComponentControl<LayoutStyleProps['position']>({
    description: 'css position',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  top: generateComponentControl<LayoutStyleProps['top']>({
    description: 'css top',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  left: generateComponentControl<LayoutStyleProps['left']>({
    description: 'css left',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  bottom: generateComponentControl<LayoutStyleProps['bottom']>({
    description: 'css bottom',
    defaultValue: '',
    disable: false,
    type: 'text',
  }),
  right: generateComponentControl<LayoutStyleProps['right']>({
    description: 'css right',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  inset: generateComponentControl<LayoutStyleProps['inset']>({
    description: 'css inset',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
  display: generateComponentControl<LayoutStyleProps['display']>({
    description: 'css display',
    defaultValue: undefined,
    disable: false,
    type: 'text',
  }),
};
