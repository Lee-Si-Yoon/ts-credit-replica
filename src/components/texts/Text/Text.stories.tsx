import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import TextComponent from './';

const meta: Meta<typeof TextComponent> = {
  component: TextComponent,
};

export default meta;
type Story = StoryObj<typeof TextComponent>;

export const Text: Story = {
  args: {
    children: faker.lorem.paragraphs(5),
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
      options: ['start', 'end', undefined],
      control: { type: 'inline-radio' },
    },
    as: {
      options: ['p', 'span', 'a'],
      control: { type: 'select' },
    },
  },
};
