import React from 'react';
import type { CardsResponse } from '../../pages/remotes';
import { CreditCardCarousel } from './credit-card-carousel';
import { CreditCardMeta } from './credit-card-meta';
// import { clamp } from './utils/clamp';

interface CreditCardRecommendationProps {
  index: number;
  // autoPlayTrigger: boolean;
  data?: CardsResponse;
  setIndex: (index: number) => void;
  // setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreditCardRecommendationContext =
  React.createContext<CreditCardRecommendationProps>({
    index: 0,
    // autoPlayTrigger: false,
    data: { cards: [] },
    setIndex: () => {},
    // setAutoPlay: () => {},
  });

export const useCreditCardRecommendationContext = () => {
  return React.useContext(CreditCardRecommendationContext);
};

const CreditCardRecommendation = ({
  data,
  children,
}: React.PropsWithChildren<Pick<CreditCardRecommendationProps, 'data'>>) => {
  const [index, setIndex] = React.useState(0);

  // const autoPlayTimer = React.useRef<NodeJS.Timer>();
  // const resetAutoPlayDelay = React.useRef<NodeJS.Timeout>();

  const providerValue = React.useMemo(() => {
    return { index, setIndex, data };
  }, [index, data]);

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

  return (
    <CreditCardRecommendationContext.Provider value={providerValue}>
      {children}
    </CreditCardRecommendationContext.Provider>
  );
};

CreditCardRecommendation.Default = CreditCardRecommendation;
CreditCardRecommendation.Carousel = CreditCardCarousel;
CreditCardRecommendation.Meta = CreditCardMeta;

export { CreditCardRecommendation };
