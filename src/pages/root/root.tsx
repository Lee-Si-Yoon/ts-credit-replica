// import { useQuery } from 'react-query';
// import { getMe } from '../remotes';
import React from 'react';
import { gray } from '@radix-ui/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Spacing from '../../components/spacing';
import creditCard1 from './credit-card-1.png';
import creditCard2 from './credit-card-2.png';
import creditCard3 from './credit-card-3.png';
import classes from './root.module.scss';

export function Root() {
  const [index, setIndex] = React.useState(0);

  const cards = [
    {
      id: '1',
      image: creditCard1,
    },
    {
      id: '2',
      image: creditCard2,
    },
    {
      id: '3',
      image: creditCard3,
    },
  ];

  const mod = (n: number, m: number) => {
    const result = n % m;

    // because JS remainder always takes the sign of the dividend
    // e.g. -1 % 3 === -1
    return result >= 0 ? result : result + m;
  };

  return (
    <>
      <Spacing size={20} />
      <div className={classes.CarouselContainer}>
        <div className={classes.Carousel}>
          {cards.map((item, i) => {
            const indexLeft = mod(index - 1, cards.length);
            const indexRight = mod(index + 1, cards.length);

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
                src={item.image}
                alt={item.id}
              />
            );
          })}
          <div className={classes.ButtonContainer}>
            <button
              onClick={() => {
                return setIndex(mod(index - 1, cards.length));
              }}
              style={{
                backgroundColor: gray.gray6,
              }}
            >
              <ArrowLeftIcon />
            </button>
            <button
              onClick={() => {
                return setIndex(mod(index + 1, cards.length));
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
    </>
  );
}
