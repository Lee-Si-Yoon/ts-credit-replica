import React from 'react';
import type { CardsResponse } from '@pages/Remotes';
import { clamp } from '@utils/Clamp';
import { CreditCardCarousel } from './CreditCardCarousel';
import { CreditCardMeta } from './CreditCardMeta';
import type { DragDirections } from './UseDragDirection';
import UseDragDirection from './UseDragDirection';

interface CreditCardRecommendationProps {
  index: number;
  rotationDegree: number;
  dragDirection: DragDirections;
  data?: CardsResponse;
  setIndex: (index: number) => void;
  // autoPlayTrigger: boolean;
  // setRotationDegree: (degree: number) => void;
  // setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreditCardRecommendationContext =
  React.createContext<CreditCardRecommendationProps>({
    index: 0,
    rotationDegree: 0,
    dragDirection: 'idle',
    data: { cards: [] },
    setIndex: () => {},
    // setRotationDegree: () => {},
    // autoPlayTrigger: false,
    // setAutoPlay: () => {},
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
  } = UseDragDirection();
  const snapAnimationId = React.useRef(0);

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
        } else if (dragDirection === 'right') {
          const nextCardIndex = clamp(index - 1, data.cards.length);
          setIndex(nextCardIndex);
        }
      }
    }
  };

  // const autoPlayTimer = React.useRef<NodeJS.Timer>();
  // const resetAutoPlayDelay = React.useRef<NodeJS.Timeout>();

  // React.useEffect(() => {
  //   if (!autoPlay) {
  //     resetAutoPlayDelay.current = setTimeout(() => {
  //       return setAutoPlay(true);
  //     }, 3000);
  //   }

  //   return () => {
  //     clearTimeout(resetAutoPlayDelay.current);
  //   };
  // }, [autoPlay]);

  // React.useEffect(() => {
  //   const onAutoPlay = () => {
  //     setAutoPlayTrigger((prev) => {
  //       return !prev;
  //     });
  //     const cardList = data?.cards;

  //     if (autoPlay && cardList) {
  //       setIndex((prevIndex) => {
  //         return clamp(prevIndex + 1, cardList.length ?? 0);
  //       });
  //     }
  //   };

  //   autoPlayTimer.current = setInterval(onAutoPlay, 3000);

  //   return () => {
  //     clearInterval(autoPlayTimer.current);
  //   };
  // }, [autoPlay, data?.cards, index]);

  const providerValue = React.useMemo(() => {
    return {
      index,
      rotationDegree,
      dragDirection,
      data,
      setIndex,
      setRotationDegree,
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
