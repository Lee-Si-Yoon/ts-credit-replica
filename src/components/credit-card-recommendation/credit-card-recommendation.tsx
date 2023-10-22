import React from 'react';
import type { GetCards } from '../../pages/remotes';
import { CreditCardCarousel } from './credit-card-carousel';

interface CreditCardRecommendationProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  data?: GetCards;
}

const CreditCardRecommendationContext =
  React.createContext<CreditCardRecommendationProps>({
    index: 0,
    setIndex: () => {},
    data: { cards: [] },
  });

export const useCreditCardRecommendationContext = () => {
  return React.useContext(CreditCardRecommendationContext);
};

const CreditCardRecommendation = ({
  data,
  children,
}: React.PropsWithChildren<Pick<CreditCardRecommendationProps, 'data'>>) => {
  const [index, setIndex] = React.useState(0);

  const providerValue = React.useMemo(() => {
    return { index, setIndex, data };
  }, [index, data]);

  return (
    <CreditCardRecommendationContext.Provider value={providerValue}>
      {children}
    </CreditCardRecommendationContext.Provider>
  );
};

CreditCardRecommendation.Default = CreditCardRecommendation;
CreditCardRecommendation.Carousel = CreditCardCarousel;

export { CreditCardRecommendation };
