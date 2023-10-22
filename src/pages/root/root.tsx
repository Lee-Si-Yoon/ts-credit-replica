// import { useQuery } from 'react-query';
// import { getMe } from '../remotes';
import React from 'react';
import { CreditCardCarousel } from '../../components/credit-card-recommendation/credit-card-carousel';
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
      src: creditCard1,
    },
    {
      id: '2',
      src: creditCard2,
    },
    {
      id: '3',
      src: creditCard3,
    },
  ];

  return (
    <>
      <Spacing size={20} />
      <span className={classes.T}>d</span>
      <CreditCardCarousel cards={cards} index={index} setIndex={setIndex} />
    </>
  );
}
