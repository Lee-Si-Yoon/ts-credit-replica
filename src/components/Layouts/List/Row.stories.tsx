import type { Meta, StoryObj } from '@storybook/react';
import ListComponent from '.';
import ListRowComponent from './Row';

const meta: Meta<typeof ListRowComponent> = {
  component: ListRowComponent,
  argTypes: {
    onClick: {
      action: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListRowComponent>;

export const Row: Story = {
  args: {
    withArrow: true,
    children: <span>content</span>,
  },
  render: (args) => {
    return (
      <ListComponent>
        {Array.from({ length: 5 }).map((_, i) => {
          return <ListComponent.Row key={`${i + 1}`} {...args} />;
        })}
      </ListComponent>
    );
  },
};
