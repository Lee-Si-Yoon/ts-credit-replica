import { clamp } from '@utils/clamp';
import { useThrottleTime } from '@utils/throttle';
import { css } from '@emotion/react';
import { gray } from '@radix-ui/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useCreditCardRecommendationContext } from './CreditCardRecommendation';

const throttleTime = 500;

const carouselContainer = css`
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
`;

const outerCylinder = css`
  width: 150px;
  aspect-ratio: 1 / 1.58;
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateY(0deg);
`;

const innerCylinder = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: center;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transition: ${throttleTime}ms;
`;

const card = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 4px 4px 6px 0px rgba(0, 0, 0, 0.15);
  user-select: none;
  cursor: pointer;
`;

const buttonWidth = 40;

const buttonContainer = css`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: calc(300px + ${buttonWidth * 2}px);
  height: fit-content;
  margin: auto;
`;

const button = css`
  height: ${buttonWidth}px;
  width: ${buttonWidth}px;
  border-radius: ${buttonWidth}px;
  border: 0;
  display: grid;
  place-items: center;
  background-color: ${gray.gray6};
  cursor: pointer;

  & svg {
    width: 24px;
    height: 24px;

    & path {
      fill: white;
      stroke: white;
      stroke-width: 1px;
    },
  },
`;

export function CreditCardCarousel() {
  const { data, index, rotationDegree, setIndex, setIsAutoPlaying } =
    useCreditCardRecommendationContext();

  const cards = data?.cards.map((datum) => {
    const { benefit, ...rest } = datum;

    return rest;
  });

  const showPrevCard = useThrottleTime(() => {
    if (cards !== undefined) {
      const nextCardIndex = clamp(index - 1, cards.length);
      setIndex(nextCardIndex);
      setIsAutoPlaying(false);
    }
  }, throttleTime);

  const showNextCard = useThrottleTime(() => {
    if (cards !== undefined) {
      const nextCardIndex = clamp(index + 1, cards.length);
      setIndex(nextCardIndex);
      setIsAutoPlaying(false);
    }
  }, throttleTime);

  return (
    <div css={carouselContainer}>
      <div css={outerCylinder}>
        {cards !== undefined &&
          cards.map((item, i) => {
            const indexLeft = clamp(index - 1, cards.length);
            const indexRight = clamp(index + 1, cards.length);

            return (
              <span
                key={item.id}
                css={innerCylinder}
                style={{
                  opacity: i === index ? 1 : 0,
                  transform: `rotateY(calc(${
                    i === indexLeft
                      ? -90
                      : i === indexRight
                        ? 90
                        : rotationDegree
                  }deg)) translateZ(150px)`,
                }}
              >
                <img
                  css={card}
                  src={item.src}
                  alt={item.id}
                  draggable={false}
                  unselectable="on"
                />
              </span>
            );
          })}
      </div>
      <div css={buttonContainer}>
        <button onClick={showPrevCard} css={button}>
          <ArrowLeftIcon />
        </button>
        <button onClick={showNextCard} css={button}>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
