import { clamp } from '@utils/clamp';
import { lerpRanges } from '@utils/lerp';
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
  const { data, index, rotationDegree, dragDirection } =
    useCreditCardRecommendationContext();

  const meta = data?.cards.map((datum) => {
    const { src, ...rest } = datum;

    return rest;
  });

  const getMetaDataOpacity = ({
    currentIndex,
    indexLeft,
    indexRight,
  }: {
    currentIndex: number;
    indexLeft: number;
    indexRight: number;
  }) => {
    if (currentIndex === index) {
      if (dragDirection === 'right') {
        return lerpRanges(rotationDegree, 90, 0, 0, 1);
      } else if (dragDirection === 'left') {
        return lerpRanges(rotationDegree, -90, 0, 0, 1);
      }

      return 1;
    } else if (currentIndex === indexLeft) {
      if (dragDirection === 'right') {
        return lerpRanges(rotationDegree, 90, 0, 1, 0);
      } else if (dragDirection === 'left') {
        return 0;
      }
    } else if (currentIndex === indexRight) {
      if (dragDirection === 'right') {
        return 0;
      } else if (dragDirection === 'left') {
        return lerpRanges(rotationDegree, -90, 0, 1, 0);
      }
    }

    return 0;
  };

  return (
    <div css={metaDataContainer}>
      {meta?.map((item, i) => {
        const indexLeft = clamp(index - 1, meta.length);
        const indexRight = clamp(index + 1, meta.length);

        return (
          <div
            key={item.id}
            css={metaData}
            style={{
              opacity: getMetaDataOpacity({
                currentIndex: i,
                indexLeft,
                indexRight,
              }),
              transform:
                i === indexLeft
                  ? `translateX(${rotationDegree - 50}%)`
                  : i === indexRight
                  ? `translateX(${rotationDegree + 50}%)`
                  : `translateX(${rotationDegree}%)`,
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
