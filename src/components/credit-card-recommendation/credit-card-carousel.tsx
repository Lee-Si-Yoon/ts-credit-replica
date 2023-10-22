import { gray } from '@radix-ui/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import classes from './credit-card-carousel.module.scss';
import { useCreditCardRecommendationContext } from './credit-card-recommendation';
import { clamp } from './utils/clamp';

export function CreditCardCarousel() {
  const { data, index, setIndex } = useCreditCardRecommendationContext();

  const cards = data?.cards.map((datum) => {
    const { benefit, ...rest } = datum;

    return rest;
  });

  return (
    <div className={classes.CarouselContainer}>
      <div className={classes.Carousel}>
        {cards?.map((item, i) => {
          const indexLeft = clamp(index - 1, cards.length);
          const indexRight = clamp(index + 1, cards.length);

          const getClassName = () => {
            if (i === index) {
              return classes.Active;
            } else if (i === indexRight) {
              return classes.Right;
            } else if (i === indexLeft) {
              return classes.Left;
            } else return '';
          };

          return (
            <img
              key={item.id}
              className={[classes.Card, getClassName()].join(' ')}
              src={item.src}
              alt={item.id}
            />
          );
        })}

        <div className={classes.ButtonContainer}>
          <button
            onClick={() => {
              return setIndex(clamp(index - 1, cards?.length ?? 0));
            }}
            style={{
              backgroundColor: gray.gray6,
            }}
          >
            <ArrowLeftIcon />
          </button>
          <button
            onClick={() => {
              return setIndex(clamp(index + 1, cards?.length ?? 0));
            }}
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
