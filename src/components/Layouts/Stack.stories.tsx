import type { Meta, StoryObj } from '@storybook/react';
import StackComponent from './Stack';

const meta: Meta<typeof StackComponent> = {
  component: StackComponent,
  argTypes: {
    gap: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StackComponent>;

export const Stack: Story = {
  render: (args) => {
    return (
      <StackComponent {...args}>
        <div
          style={{ backgroundColor: 'black', height: '50px', width: '100%' }}
        />
        <div
          style={{ backgroundColor: 'black', height: '50px', width: '80%' }}
        />
      </StackComponent>
    );
  },
};
