import { useQuery } from 'react-query';
import CreditCardBilling from '@components/CreditCardBilling/CreditCardBilling';
import { CreditCardRecommendation } from '@components/CreditCardRecommendation/CreditCardRecommendation';
import Spacing from '@components/Layouts/Spacing';
import { getCards, getMe } from '@pages/remotes';

export function Root() {
  const { data: selfData } = useQuery('getMe', getMe);
  const { data: cardData } = useQuery('getCards', getCards);

  return (
    <>
      <Spacing size={44} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CreditCardBilling width={`calc(100% - 2rem)`} height={40} />
      </div>
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
