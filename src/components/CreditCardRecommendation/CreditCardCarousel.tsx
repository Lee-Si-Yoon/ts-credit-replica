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
  user-select: none;
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
  transform: rotateY(0deg);
  transition: 500ms;
  zindex: 0;
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

const snapAnimationOffset = 7;

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
        setIsMouseDragging(true);

        setRotationDegree((prev) => {
          if (e.movementX > 0) {
            setDragDirection('right');
          } else if (e.movementX < 0) {
            setDragDirection('left');
          } else {
            setDragDirection('idle');
          }

          const nextDegree = (prev % 360) + e.movementX;

          if (nextDegree >= 90 || nextDegree <= -90) return prev;

          return (prev % 360) + e.movementX;
        });
      }
    },
    [isMouseDown]
  );

  const snapRotateCard = React.useCallback(
    (direction: 'left' | 'right' | 'idle') => {
      const animate = () => {
        if (direction === 'right') {
          setDragDirection('right');
          setRotationDegree((prev) => {
            const multipleOf90 = Math.floor(prev / 90) * 90;

            if (
              prev >= multipleOf90 - snapAnimationOffset &&
              prev <= multipleOf90 + snapAnimationOffset
            ) {
              setDragDirection('idle');
              cancelAnimationFrame(snapAnimationId.current);

              return 0;
            }

            return (prev % 360) + snapAnimationOffset;
          });
        } else if (direction === 'left') {
          setDragDirection('left');
          setRotationDegree((prev) => {
            const multipleOf90 = Math.floor(prev / 90) * 90;

            if (
              prev >= multipleOf90 - snapAnimationOffset &&
              prev <= multipleOf90 + snapAnimationOffset
            ) {
              setDragDirection('idle');
              cancelAnimationFrame(snapAnimationId.current);

              return 0;
            }

            return (prev % 360) - snapAnimationOffset;
          });
        }

        snapAnimationId.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(snapAnimationId.current);
      };
    },
    []
  );

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

  const handleContainerMouseUp = React.useCallback(() => {
    setIsMouseDown(false);

    if (isMouseDragging === true) {
      setIsMouseDragging(false);
      snapRotateCard(dragDirection);

      if (cards !== undefined) {
        if (dragDirection === 'left') {
          const nextCardIndex = clamp(index + 1, cards.length);
          setIndex(nextCardIndex);
        } else if (dragDirection === 'right') {
          const nextCardIndex = clamp(index - 1, cards.length);
          setIndex(nextCardIndex);
        }
      }
    }
  }, [cards, dragDirection, index, isMouseDragging, setIndex, snapRotateCard]);

  return (
    <div
      role="presentation"
      ref={carouselContainerRef}
      onMouseDown={() => {
        setIsMouseDown(true);
      }}
      onMouseMove={handleContainerMouseMove}
      onMouseUp={handleContainerMouseUp}
      onMouseLeave={handleContainerMouseUp}
      css={carouselContainer}
    >
      <div
        css={carouselBody}
        style={{
          transform: `perspective(${perspective}px) rotateY(${0}deg)`,
        }}
      >
        {cards !== undefined &&
          cards.map((item, i) => {
            const indexLeft = clamp(index - 1, cards.length);
            const indexRight = clamp(index + 1, cards.length);

            return (
              <span
                key={item.id}
                css={card}
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
                  css={cardImg}
                  src={item.src}
                  alt={item.id}
                  draggable={false}
                  unselectable="on"
                />
              </span>
            );
          })}
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
