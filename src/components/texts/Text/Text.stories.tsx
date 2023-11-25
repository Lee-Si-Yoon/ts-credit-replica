import type { Meta, StoryObj } from '@storybook/react';
import TextComponent from './';
import { layoutStylePropsController } from '.storybook/stylePropsController';

const loremParagrpah =
  'Ante succurro audacia suus aufero sui aestivus tempus. Subiungo totam adicio. Quasi usque eius clam caries cavus subiungo. Cui corona venustas virgo bos vomer cunabula deficio. Ultra coepi bardus aperte stillicidium. Condico aetas tempore voco iusto deputo. Validus viriliter volva ventus tenax cupressus vix strenuus cupressus. Acervus venia cornu celer. Alveus theologus vulpes video vesper agnitio apostolus curiositas. Valetudo debilito adflicto dolorem suus utrum theatrum. Tolero adopto compello. Spiritus tenuis coaegresco alter artificiose verbum a conqueror tergum aufero. Ventosus animadverto vito absorbeo decumbo censura autem aufero. Dens perferendis laudantium. Asporto cuius carmen peccatus a sto cometes deduco.';

const meta: Meta<typeof TextComponent.Default> = {
  component: TextComponent.Default,
};

export default meta;
type Story = StoryObj<typeof TextComponent.Default>;

export const Text: Story = {
  args: {
    children: loremParagrpah,
  },
  argTypes: {
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
    ...layoutStylePropsController,
  },
};
