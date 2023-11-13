import type { Meta, StoryObj } from '@storybook/react';
import TitleComponent from './';

const meta: Meta<typeof TitleComponent> = {
  component: TitleComponent,
};

export default meta;
type Story = StoryObj<typeof TitleComponent>;

export const Title: Story = {
  args: {
    children: 'lorem ipsum',
  },
  argTypes: {
    as: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
  },
};
