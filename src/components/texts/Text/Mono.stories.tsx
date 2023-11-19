import type { Meta, StoryObj } from '@storybook/react';
import { layoutStylePropsController } from '../../../.storybook/stylePropsController';
import TextComponent from './';

const loremCode = "console.log('hello world!')";

const meta: Meta<typeof TextComponent.Mono> = {
  component: TextComponent.Mono,
};

export default meta;
type Story = StoryObj<typeof TextComponent.Mono>;

export const Mono: Story = {
  args: {
    children: loremCode,
    backgroundColor: 'gray',
    padding: '0.375rem',
    borderRadius: '0.25rem',
  },
  argTypes: {
    as: {
      options: ['code', 'kbd', 'pre', 'samp'],
      control: { type: 'select' },
    },
    backgroundColor: {
      control: { type: 'color' },
    },
    ...layoutStylePropsController,
  },
};
