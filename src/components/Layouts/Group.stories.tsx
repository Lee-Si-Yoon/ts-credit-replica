import type { Meta, StoryObj } from '@storybook/react';
import GroupComponent from './Group';

const meta: Meta<typeof GroupComponent> = {
  component: GroupComponent,
};

export default meta;
type Story = StoryObj<typeof GroupComponent>;

export const Group: Story = {
  args: {},
  render: (args) => {
    return (
      <GroupComponent {...args}>
        <div
          style={{ backgroundColor: 'black', height: '80px', width: '50px' }}
        />
        <div
          style={{ backgroundColor: 'black', height: '50px', width: '80px' }}
        />
      </GroupComponent>
    );
  },
};
