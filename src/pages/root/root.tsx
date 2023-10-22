import { useQuery } from 'react-query';
import { CreditCardRecommendation } from '../../components/credit-card-recommendation/credit-card-recommendation';
import Spacing from '../../components/spacing';
import { getCards, getMe } from '../remotes';
import classes from './root.module.scss';

export function Root() {
  const { data: selfData } = useQuery('getMe', getMe);
  const { data: cardData } = useQuery('getCards', getCards);

  return (
    <>
      <Spacing size={20} />
      <h1
        className={classes.Title}
      >{`${selfData?.name}님을 위한 추천 카드`}</h1>
      <CreditCardRecommendation.Default data={cardData}>
        <CreditCardRecommendation.Carousel />
      </CreditCardRecommendation.Default>
    </>
  );
}
