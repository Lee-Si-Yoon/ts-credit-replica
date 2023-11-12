import type { Meta, StoryObj } from '@storybook/react';
import SpacingComponent from './Spacing';

const meta: Meta<typeof SpacingComponent> = {
  component: SpacingComponent,
};

export default meta;
type Story = StoryObj<typeof SpacingComponent>;

export const Spacing: Story = {
  args: {
    size: 50,
  },
  decorators: [
    (Story) => {
      return (
        <>
          <div style={{ backgroundColor: 'black', height: '50px' }} />
          <Story />
          <div style={{ backgroundColor: 'black', height: '50px' }} />
        </>
      );
    },
  ],
};
