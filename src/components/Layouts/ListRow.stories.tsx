import type { Meta, StoryObj } from '@storybook/react';
import ListComponent from './List';
import ListRowComponent from './ListRow';

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

export const ListRow: Story = {
  args: {
    withArrow: true,
    content: <span>content</span>,
  },
  render: (args) => {
    return (
      <ListComponent>
        {Array.from({ length: 5 }).map((_, i) => {
          return <ListRowComponent key={`${i + 1}`} {...args} />;
        })}
      </ListComponent>
    );
  },
};
