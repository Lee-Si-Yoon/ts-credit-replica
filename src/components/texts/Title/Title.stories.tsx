import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import TitleComponent from './';

const meta: Meta<typeof TitleComponent> = {
  component: TitleComponent,
};

export default meta;
type Story = StoryObj<typeof TitleComponent>;

export const Title: Story = {
  args: {
    children: faker.lorem.sentence(),
  },
  argTypes: {
    as: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
  },
};
