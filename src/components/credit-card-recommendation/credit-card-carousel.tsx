import { clamp } from '@utils/clamp';
import { useThrottleTime } from '@utils/throttle';
import { css, keyframes } from '@emotion/react';
import { gray } from '@radix-ui/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useCreditCardRecommendationContext } from './credit-card-recommendation';

const cardWidth = 150;
const timeOut = 500;

const CarouselContainer = css({
  width: '100%',
  height: `calc(${cardWidth}px * 1.58)`,
});
const CarouselBody = css(CarouselContainer, {
  position: 'relative',
});

const Card = css({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 'auto',
  width: `${cardWidth}px`,
  height: `calc(${cardWidth}px * 1.58)`,
  borderRadius: '12px',
  boxShadow: '4px 4px 6px 0px rgba(0, 0, 0, 0.15)',
});

const Left = keyframes`
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

const Right = keyframes`
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

const ButtonContainer = css({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: 'auto',
  width: '400px',
  zIndex: 999,
  height: `calc(${cardWidth}px * 1.58)`,
});

const Button = css({
  height: '40px',
  width: '40px',
  borderRadius: '40px',
  border: 0,
  display: 'grid',
  placeItems: 'center',
  backgroundColor: `${gray.gray6}`,

  '& svg': {
    width: '24px',
    height: '24px',

    '& path': {
      fill: 'white',
      stroke: 'white',
      strokeWidth: '1px',
    },
  },
});

export function CreditCardCarousel() {
  const { data, index, setIndex } = useCreditCardRecommendationContext();

  const cards = data?.cards.map((datum) => {
    const { benefit, ...rest } = datum;

    return rest;
  });

  const showPrevCard = useThrottleTime(() => {
    if (cards) {
      const nextCardIndex = clamp(index - 1, cards.length);
      setIndex(nextCardIndex);
    }
  }, timeOut);

  const showNextCard = useThrottleTime(() => {
    if (cards) {
      const nextCardIndex = clamp(index + 1, cards.length);
      setIndex(nextCardIndex);
    }
  }, timeOut);

  return (
    <div css={CarouselContainer}>
      <div css={CarouselBody}>
        {cards?.map((item, i) => {
          const indexLeft = clamp(index - 1, cards.length);
          const indexRight = clamp(index + 1, cards.length);

          return (
            <img
              key={item.id}
              css={css(Card, {
                transform: 'rotateY(0deg)',
                transition: '500ms',
                zIndex: 0,
                animation:
                  i === indexLeft
                    ? `${Left} 500ms linear`
                    : i === indexRight
                    ? `${Right} 500ms linear`
                    : '',
              })}
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
