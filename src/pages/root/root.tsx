import { useQuery } from 'react-query';
import { CreditCardRecommendation } from '../../components/credit-card-recommendation/credit-card-recommendation';
import Spacing from '../../components/spacing';
import { getCards, getMe } from '../remotes';

export function Root() {
  const { data: selfData } = useQuery('getMe', getMe);
  const { data: cardData } = useQuery('getCards', getCards);

  return (
    <>
      <Spacing size={20} />
      <h1>{`${selfData?.name}님을 위한 추천 카드`}</h1>
      <CreditCardRecommendation.Default data={cardData}>
        <CreditCardRecommendation.Carousel />
        <Spacing size={24} />
        <CreditCardRecommendation.Meta />
      </CreditCardRecommendation.Default>
    </>
  );
}
