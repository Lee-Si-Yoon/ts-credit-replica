import React from 'react';
import { gray } from '@radix-ui/colors';
import classes from './credit-card-meta.module.scss';
import { useCreditCardRecommendationContext } from './credit-card-recommendation';
import { clamp } from '../../utils/clamp';

export function CreditCardMeta() {
  const { data, index } = useCreditCardRecommendationContext();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const meta = data?.cards.map((datum) => {
    const { src, ...rest } = datum;

    return rest;
  });

  return (
    <div ref={containerRef} className={classes.MetaContainer}>
      {meta?.map((item, i) => {
        const indexLeft = clamp(index - 1, meta.length);
        const indexRight = clamp(index + 1, meta.length);

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
          <div
            key={item.id}
            className={[classes.Meta, getClassName()].join(' ')}
          >
            <span className={classes.Benefit}>{item.benefit}</span>
            <span className={classes.CardName} style={{ color: gray.gray9 }}>
              {item.id}
            </span>
          </div>
        );
      })}
    </div>
  );
}
