import { clamp } from '@utils/Clamp';
import { useThrottleTime } from '@utils/Throttle';
import { css, keyframes } from '@emotion/react';
import { gray } from '@radix-ui/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useCreditCardRecommendationContext } from './CreditCardRecommendation';

const cardWidth = 150;
const timeOut = 500;

const carouselContainer = css`
  width: 100%;
  height: calc(${cardWidth}px * 1.58);
`;

const carouselBody = css`
  ${carouselContainer}
  position: relative;
`;

const card = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: ${cardWidth}px;
  height: calc(${cardWidth}px * 1.58);
  border-radius: 12px;
  box-shadow: 4px 4px 6px 0px rgba(0, 0, 0, 0.15);
`;

const left = keyframes`
  0% {
    transform: rotateY(0deg) scale(1);
  }
  50% {
    transform: translateX(-100%) rotateY(-90deg) scale(0.95);
  }
  100% {
    transform: translateX(0px) rotateY(-135deg) scale(0.9);
  }
`;

const right = keyframes`
    0% {
    transform: rotateY(0deg) scale(1);
  }
  50% {
    transform: translateX(100%) rotateY(90deg) scale(0.95);
  }
  100% {
    transform: translateX(0px) rotateY(135deg) scale(0.9);
  }
`;

const AnimatedCard = ({
  index,
  indexLeft,
  indexRight,
}: Record<'index' | 'indexLeft' | 'indexRight', number>) => {
  return css(card, {
    transform: 'rotateY(0deg)',
    transition: '500ms',
    zIndex: 0,
    animation:
      index === indexLeft
        ? `${left} 500ms linear`
        : index === indexRight
        ? `${right} 500ms linear`
        : '',
  });
};

const ButtonContainer = css`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 400px;
  z-index: 999;
  height: calc(${cardWidth}px * 1.58);
`;

const Button = css`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  border: 0;
  display: grid;
  place-items: center;
  background-color: ${gray.gray6};

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
  const { data, index, setIndex } = useCreditCardRecommendationContext();

  const cards = data?.cards.map((datum) => {
    const { benefit, ...rest } = datum;

    return rest;
  });

  const showPrevCard = useThrottleTime(() => {
    if (cards !== undefined) {
      const nextCardIndex = clamp(index - 1, cards.length);
      setIndex(nextCardIndex);
    }
  }, timeOut);

  const showNextCard = useThrottleTime(() => {
    if (cards !== undefined) {
      const nextCardIndex = clamp(index + 1, cards.length);
      setIndex(nextCardIndex);
    }
  }, timeOut);

  return (
    <div css={carouselContainer}>
      <div css={carouselBody}>
        {cards !== undefined &&
          cards.map((item, i) => {
            const indexLeft = clamp(index - 1, cards.length);
            const indexRight = clamp(index + 1, cards.length);

            return (
              <img
                key={item.id}
                css={AnimatedCard({ index: i, indexLeft, indexRight })}
                style={{
                  opacity: i === index ? 1 : 0,
                  zIndex: i === index ? 99 : 0,
                }}
                src={item.src}
                alt={item.id}
              />
            );
          })}

        <div css={ButtonContainer}>
          <button onClick={showPrevCard} css={Button}>
            <ArrowLeftIcon />
          </button>
          <button onClick={showNextCard} css={Button}>
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
