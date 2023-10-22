import { rest } from 'msw';

const getMe: Parameters<typeof rest.get>[1] = (_, response, ctx) => {
  return response(
    ctx.status(200),
    ctx.json({
      name: '이시윤',
    })
  );
};

const getCards: Parameters<typeof rest.get>[1] = (_, response, ctx) => {
  return response(
    ctx.status(200),
    ctx.json({
      cards: [
        {
          id: '신한 Deep Once',
          src: 'credit-cards/credit-card-1.png',
          benefit: '주유 L당 60원 할인',
        },
        {
          id: 'KEB My lunch',
          src: 'credit-cards/credit-card-2.png',
          benefit: '점심식사 20% 페이백',
        },
        {
          id: 'KB WE:SH All',
          src: 'credit-cards/credit-card-3.png',
          benefit: '통신, 편의점, 외식 10% 할인',
        },
      ],
    })
  );
};

export const handlers = () => {
  return [rest.get('/api/me', getMe), rest.get('/api/cards', getCards)];
};
