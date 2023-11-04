import React from 'react';
import type { CardsResponse } from '@pages/remotes';
import { clamp } from '@utils/clamp';
import { CreditCardCarousel } from './CreditCardCarousel';
import { CreditCardMeta } from './CreditCardMeta';
import type { DragDirections } from './useDragDirection';
import UseDragDirection from './useDragDirection';

interface CreditCardRecommendationProps {
  index: number;
  rotationDegree: number;
  dragDirection: DragDirections;
  data?: CardsResponse;
  setIndex: (index: number) => void;
  setIsAutoPlaying: (isAutoPlaying: boolean) => void;
}

const CreditCardRecommendationContext =
  React.createContext<CreditCardRecommendationProps>({
    index: 0,
    rotationDegree: 0,
    dragDirection: 'idle',
    data: { cards: [] },
    setIndex: () => {},
    setIsAutoPlaying: () => {},
  });

export const useCreditCardRecommendationContext = () => {
  return React.useContext(CreditCardRecommendationContext);
};

const snapAnimationOffset = 7;

const CreditCardRecommendation = ({
  data,
  children,
}: React.PropsWithChildren<Pick<CreditCardRecommendationProps, 'data'>>) => {
  const [index, setIndex] = React.useState(0);
  const [rotationDegree, setRotationDegree] = React.useState(0);

  const {
    ref,
    dragDirection,
    isMouseDragging,
    // FIXME: how to handle mouseUp & mouseLeave
    setIsMouseDown,
    setIsMouseDragging,
  } = UseDragDirection<HTMLDivElement>();
  const snapAnimationId = React.useRef(0);

  const [isAutoPlaying, setIsAutoPlaying] = React.useState(false);
  const autoPlayTimer = React.useRef<NodeJS.Timer>();
  const resetAutoPlayDelay = React.useRef<NodeJS.Timeout>();

  // Whenever isAutoPlaying is set to false, after 3s it will be true again
  React.useEffect(() => {
    if (isAutoPlaying === false) {
      resetAutoPlayDelay.current = setTimeout(() => {
        return setIsAutoPlaying(true);
      }, 3000);
    }

    return () => {
      clearTimeout(resetAutoPlayDelay.current);
    };
  }, [isAutoPlaying]);

  React.useEffect(() => {
    const onAutoPlay = () => {
      if (isAutoPlaying === true && data?.cards !== undefined) {
        setIndex((prevIndex) => {
          return clamp(prevIndex + 1, data?.cards.length);
        });
      }
    };

    autoPlayTimer.current = setInterval(onAutoPlay, 3000);

    return () => {
      clearInterval(autoPlayTimer.current);
    };
  }, [data?.cards, isAutoPlaying]);

  const handleContainerMouseMove = (e: React.MouseEvent) => {
    if (isMouseDragging === true) {
      setRotationDegree((prev) => {
        const nextDegree = (prev % 360) + e.movementX;

        if (nextDegree >= 90 || nextDegree <= -90) return prev;

        return nextDegree;
      });
    }
  };

  const snapRotateCard = React.useCallback(
    (direction: 'left' | 'right' | 'idle') => {
      const animate = () => {
        if (direction === 'right') {
          setRotationDegree((prev) => {
            const multipleOf90 = Math.floor(prev / 90) * 90;

            if (
              prev >= multipleOf90 - snapAnimationOffset &&
              prev <= multipleOf90 + snapAnimationOffset
            ) {
              cancelAnimationFrame(snapAnimationId.current);

              return 0;
            }

            return (prev % 360) + snapAnimationOffset;
          });
        } else if (direction === 'left') {
          setRotationDegree((prev) => {
            const multipleOf90 = Math.floor(prev / 90) * 90;

            if (
              prev >= multipleOf90 - snapAnimationOffset &&
              prev <= multipleOf90 + snapAnimationOffset
            ) {
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

  const handleContainerMouseUp = () => {
    setIsMouseDown(false);

    if (isMouseDragging === true) {
      setIsMouseDragging(false);
      snapRotateCard(dragDirection);

      if (data?.cards !== undefined) {
        if (dragDirection === 'left') {
          const nextCardIndex = clamp(index + 1, data.cards.length);
          setIndex(nextCardIndex);
          setIsAutoPlaying(false);
        } else if (dragDirection === 'right') {
          const nextCardIndex = clamp(index - 1, data.cards.length);
          setIndex(nextCardIndex);
          setIsAutoPlaying(false);
        }
      }
    }
  };

  const providerValue = React.useMemo(() => {
    return {
      index,
      rotationDegree,
      dragDirection,
      data,
      setIndex,
      setRotationDegree,
      setIsAutoPlaying,
    };
  }, [index, rotationDegree, dragDirection, data]);

  return (
    <CreditCardRecommendationContext.Provider value={providerValue}>
      <div
        role="presentation"
        ref={ref}
        onMouseMove={handleContainerMouseMove}
        onMouseUp={handleContainerMouseUp}
        onMouseLeave={handleContainerMouseUp}
      >
        {children}
      </div>
    </CreditCardRecommendationContext.Provider>
  );
};

CreditCardRecommendation.Default = CreditCardRecommendation;
CreditCardRecommendation.Carousel = CreditCardCarousel;
CreditCardRecommendation.Meta = CreditCardMeta;

export { CreditCardRecommendation };
