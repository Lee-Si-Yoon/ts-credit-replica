import { clamp } from '@utils/Clamp';
import { css } from '@emotion/react';
import { gray } from '@radix-ui/colors';
import { useCreditCardRecommendationContext } from './CreditCardRecommendation';

const metaDataContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const metaData = css`
  position: absolute;
  transition: 500ms;
  text-align: center;
  width: fit-content;
`;

const animatedMetaData = ({
  index,
  indexLeft,
  indexRight,
}: Record<'index' | 'indexLeft' | 'indexRight', number>) => {
  return css(metaData, {
    transform:
      index === indexLeft
        ? 'translateX(-75%)'
        : index === indexRight
        ? 'translateX(75%)'
        : 'translateX(0%)',
  });
};

const benefit = css`
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
`;

const cardName = css`
  display: block;
  margin-top: 8px;
  font-size: 0.875rem;
  font-weight: 300;
  color: ${gray.gray9};
`;

export function CreditCardMeta() {
  const { data, index } = useCreditCardRecommendationContext();

  const meta = data?.cards.map((datum) => {
    const { src, ...rest } = datum;

    return rest;
  });

  return (
    <div css={metaDataContainer}>
      {meta?.map((item, i) => {
        const indexLeft = clamp(index - 1, meta.length);
        const indexRight = clamp(index + 1, meta.length);

        return (
          <div
            key={item.id}
            css={animatedMetaData({ index: i, indexLeft, indexRight })}
            style={{
              opacity: i === index ? 1 : 0,
            }}
          >
            <span css={benefit}>{item.benefit}</span>
            <span css={cardName}>{item.id}</span>
          </div>
        );
      })}
    </div>
  );
}
