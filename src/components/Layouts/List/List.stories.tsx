import type { Meta, StoryObj } from '@storybook/react';
import ListComponent from '.';

const meta: Meta<typeof ListComponent> = {
  component: ListComponent,
};

export default meta;
type Story = StoryObj<typeof ListComponent>;

export const Default: Story = {
  render: (args) => {
    return (
      <ListComponent {...args}>
        <li
          style={{ backgroundColor: 'black', height: '50px', width: '100%' }}
        />
        <li
          style={{ backgroundColor: 'black', height: '50px', width: '80%' }}
        />
      </ListComponent>
    );
  },
};

export const Horizontal: Story = {
  render: (args) => {
    return (
      <ListComponent.Horizontal {...args}>
        <li
          style={{ backgroundColor: 'black', height: '50px', width: '100%' }}
        />
        <li
          style={{ backgroundColor: 'black', height: '50px', width: '80%' }}
        />
      </ListComponent.Horizontal>
    );
  },
};
