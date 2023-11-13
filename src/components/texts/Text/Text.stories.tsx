import type { Meta, StoryObj } from '@storybook/react';
import TextComponent from './';

const meta: Meta<typeof TextComponent> = {
  component: TextComponent,
};

export default meta;
type Story = StoryObj<typeof TextComponent>;

export const Text: Story = {
  args: {
    children: 'lorem ipsum',
    lineClamp: 4,
  },
  argTypes: {
    span: {
      control: { type: 'boolean' },
    },
    lineClamp: {
      control: { type: 'number' },
    },
    inherit: {
      control: { type: 'boolean' },
    },
    truncate: {
      options: ['start', 'end'],
      control: { type: 'inline-radio' },
    },
  },
};
