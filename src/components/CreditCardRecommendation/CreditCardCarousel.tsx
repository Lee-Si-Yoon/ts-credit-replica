import React from 'react';
import { clamp } from '@utils/Clamp';
import { useThrottleTime } from '@utils/Throttle';
import { css } from '@emotion/react';
import { gray } from '@radix-ui/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useCreditCardRecommendationContext } from './CreditCardRecommendation';

const cardWidth = 150;
const timeOut = 500;
const perspective = 1000;

const carouselContainer = css`
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const carouselBody = css`
  width: 150px;
  aspect-ratio: 1 / 1.58;
  transform-style: preserve-3d;
`;

const card = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: center;
  transform-style: preserve-3d;
`;

const backwardCard = css`
  ${card}
  transform: rotateY(calc(360deg)) translateZ(150px)
`;

const forwardCard = css`
  ${card}
  transform: rotateY(calc(180deg)) translateZ(150px)
`;

const cardImg = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 4px 4px 6px 0px rgba(0, 0, 0, 0.15);
  user-select: none;
`;

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
  const { data, index, setIndex } = useCreditCardRecommendationContext();

  const cards = data?.cards.map((datum) => {
    const { benefit, ...rest } = datum;

    return rest;
  });

  const [rotationDegree, setRotationDegree] = React.useState(0);
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [isMouseDragging, setIsMouseDragging] = React.useState(false);
  const [dragDirection, setDragDirection] = React.useState<
    'left' | 'right' | 'idle'
  >('idle');
  const snapAnimationId = React.useRef(0);
  const carouselContainerRef = React.useRef<HTMLDivElement>(null);

  const handleContainerMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (isMouseDown === true) {
        if (isMouseDragging === false) {
          setIsMouseDragging(true);
        }

        setRotationDegree((prev) => {
          if (e.movementX > 0) {
            setDragDirection('right');
          } else if (e.movementX < 0) {
            setDragDirection('left');
          } else {
            setDragDirection('idle');
          }

          return (prev % 360) + e.movementX;
        });
      }
    },
    [isMouseDown, isMouseDragging]
  );

  const snapRotateCard = React.useCallback(
    (direction: 'left' | 'right' | 'idle') => {
      snapAnimationId.current = 0;

      const animate = () => {
        if (direction === 'right') {
          setRotationDegree((prev) => {
            if (prev % 180 === 0) {
              if (cards !== undefined) {
                const nextCardIndex = clamp(index + 1, cards.length);
                setIndex(nextCardIndex);
              }

              cancelAnimationFrame(snapAnimationId.current);

              return prev;
            }

            return prev + 1;
          });
        } else if (direction === 'left') {
          setRotationDegree((prev) => {
            if (prev % 180 === 0) {
              if (cards !== undefined) {
                const nextCardIndex = clamp(index - 1, cards.length);
                setIndex(nextCardIndex);
              }

              cancelAnimationFrame(snapAnimationId.current);

              return prev;
            }

            return prev - 1;
          });
        }

        /* FIXME: increase animation speed */
        snapAnimationId.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(snapAnimationId.current);
      };
    },
    [cards, index, setIndex]
  );

  const showPrevCard = useThrottleTime(() => {
    setRotationDegree((prev) => {
      return prev - 1;
    });
    snapRotateCard('left');
  }, timeOut);

  const showNextCard = useThrottleTime(() => {
    setRotationDegree((prev) => {
      return prev + 1;
    });
    snapRotateCard('right');
  }, timeOut);

  return (
    <div
      role="presentation"
      ref={carouselContainerRef}
      onMouseDown={() => {
        setIsMouseDown(true);
      }}
      onMouseUp={() => {
        setIsMouseDown(false);

        if (isMouseDragging === true) {
          setIsMouseDragging(false);
          snapRotateCard(dragDirection);
        }
      }}
      onMouseMove={handleContainerMouseMove}
      css={carouselContainer}
    >
      <div
        css={carouselBody}
        style={{
          transform: `perspective(${perspective}px) rotateY(${rotationDegree}deg)`,
        }}
      >
        {cards !== undefined && (
          <>
            /* FIXME: switch data for backwardCard */
            <span
              key={cards[clamp(index + 1, cards.length)]!.id}
              css={backwardCard}
            >
              <img
                css={cardImg}
                src={cards[clamp(index + 1, cards.length)]!.src}
                alt={cards[clamp(index + 1, cards.length)]!.id}
                draggable={false}
                unselectable="on"
              />
            </span>
            <span key={cards[index]!.id} css={forwardCard}>
              <img
                css={cardImg}
                src={cards[index]!.src}
                alt={cards[index]!.id}
                draggable={false}
                unselectable="on"
              />
            </span>
          </>
        )}
      </div>
      <div css={ButtonContainer}>
        <button onClick={showPrevCard} css={Button}>
          <ArrowLeftIcon />
        </button>
        <button onClick={showNextCard} css={Button}>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
