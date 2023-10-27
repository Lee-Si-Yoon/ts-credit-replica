import { clamp } from '@utils/clamp';
import { css } from '@emotion/react';
import { gray } from '@radix-ui/colors';
import { useCreditCardRecommendationContext } from './credit-card-recommendation';

const Meta = css`
  position: absolute;
  transition: 500ms;
  text-align: center;
  width: fit-content;
`;

const Benefit = css`
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
`;

const CardName = css({
  display: 'block',
  marginTop: '8px',
  fontSize: '0.875rem',
  fontWeight: 300,
  color: gray.gray9,
});

export function CreditCardMeta() {
  const { data, index } = useCreditCardRecommendationContext();

  const meta = data?.cards.map((datum) => {
    const { src, ...rest } = datum;

    return rest;
  });

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;
      `}
    >
      {meta?.map((item, i) => {
        const indexLeft = clamp(index - 1, meta.length);
        const indexRight = clamp(index + 1, meta.length);

        return (
          <div
            key={item.id}
            css={Meta}
            style={{
              transform:
                i === indexLeft
                  ? 'translateX(-75%)'
                  : i === indexRight
                  ? 'translateX(75%)'
                  : 'translateX(0%)',
              opacity: i === index ? 1 : 0,
            }}
          >
            <span css={Benefit}>{item.benefit}</span>
            <span css={CardName}>{item.id}</span>
          </div>
        );
      })}
    </div>
  );
}
