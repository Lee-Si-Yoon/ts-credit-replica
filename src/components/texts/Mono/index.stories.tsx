import type { Meta, StoryObj } from '@storybook/react';
import MonoComponent from './';

const loremCode = "console.log('hello world!')";

const meta: Meta<typeof MonoComponent> = {
  component: MonoComponent,
};

export default meta;
type Story = StoryObj<typeof MonoComponent>;

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
    block: {
      control: { type: 'boolean' },
    },
    backgroundColor: {
      control: { type: 'color' },
    },
  },
};
