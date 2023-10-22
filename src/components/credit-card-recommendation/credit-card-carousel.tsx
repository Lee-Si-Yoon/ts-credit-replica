import React from 'react';
import { gray } from '@radix-ui/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useThrottleTime } from '../../utils/throttle';
import classes from './credit-card-carousel.module.scss';
import { useCreditCardRecommendationContext } from './credit-card-recommendation';
import { clamp } from './utils/clamp';

const timeOut = 500;

export function CreditCardCarousel() {
  const { data, index, setIndex } = useCreditCardRecommendationContext();

  const cards = data?.cards.map((datum) => {
    const { benefit, ...rest } = datum;

    return rest;
  });

  const leftButtonClickCreatedCard = React.useRef<React.ReactNode>(null);
  const rightButtonClickCreatedCard = React.useRef<React.ReactNode>(null);

  const onLeftButtonClick = useThrottleTime(() => {
    if (cards) {
      leftButtonClickCreatedCard.current = null;
      rightButtonClickCreatedCard.current = null;
      const nextCardIndex = clamp(index - 1, cards.length);
      leftButtonClickCreatedCard.current = (
        <img
          alt={cards[nextCardIndex]?.id}
          src={cards[nextCardIndex]?.src}
          className={[classes.Card, classes.EnterLeft].join(' ')}
        />
      );
      setIndex(clamp(index - 1, cards.length));
    }
  }, timeOut);

  const onRightButtonClick = useThrottleTime(() => {
    if (cards) {
      leftButtonClickCreatedCard.current = null;
      rightButtonClickCreatedCard.current = null;
      const nextCardIndex = clamp(index + 1, cards.length);
      rightButtonClickCreatedCard.current = (
        <img
          alt={cards[nextCardIndex]?.id}
          src={cards[nextCardIndex]?.src}
          className={[classes.Card, classes.EnterRight].join(' ')}
        />
      );
      setIndex(nextCardIndex);
    }
  }, timeOut);

  // React.useEffect(() => {
  //   onRightButtonClick();
  // }, [autoPlayTrigger, onRightButtonClick]);

  return (
    <div className={classes.CarouselContainer}>
      <div className={classes.Carousel}>
        {cards?.map((item, i) => {
          const indexLeft = clamp(index - 1, cards.length);
          const indexRight = clamp(index + 1, cards.length);

          if (i === indexLeft)
            return (
              <>
                {leftButtonClickCreatedCard.current &&
                  leftButtonClickCreatedCard.current}
                <img
                  key={item.id}
                  className={[classes.Card, classes.Left].join(' ')}
                  src={item.src}
                  alt={item.id}
                />
              </>
            );

          if (i === indexRight)
            return (
              <>
                {rightButtonClickCreatedCard.current &&
                  rightButtonClickCreatedCard.current}
                <img
                  key={item.id}
                  className={[classes.Card, classes.Right].join(' ')}
                  src={item.src}
                  alt={item.id}
                />
              </>
            );

          return (
            <>
              <img
                key={item.id}
                className={[classes.Card, classes.Active].join(' ')}
                src={item.src}
                alt={item.id}
              />
            </>
          );
        })}

        <div className={classes.ButtonContainer}>
          <button
            onClick={onLeftButtonClick}
            style={{
              backgroundColor: gray.gray6,
            }}
          >
            <ArrowLeftIcon />
          </button>
          <button
            onClick={onRightButtonClick}
            style={{
              backgroundColor: gray.gray6,
            }}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
