import React from 'react';
import { useQuery } from 'react-query';
import { CreditCardCarousel } from '../../components/credit-card-recommendation/credit-card-carousel';
import Spacing from '../../components/spacing';
import { getCards, getMe } from '../remotes';
import classes from './root.module.scss';

export function Root() {
  const { data: selfData } = useQuery('getMe', getMe);
  const { data: cardData } = useQuery('getCards', getCards);

  const [index, setIndex] = React.useState(0);
  const parsedCardData = cardData?.data.map((datum) => {
    const { benefit, ...rest } = datum;

    return rest;
  });

  return (
    <>
      <Spacing size={20} />
      <h1
        className={classes.Title}
      >{`${selfData?.name}님을 위한 추천 카드`}</h1>
      <CreditCardCarousel
        cards={parsedCardData}
        index={index}
        setIndex={setIndex}
      />
    </>
  );
}
