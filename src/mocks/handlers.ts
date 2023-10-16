import { rest } from 'msw';

export const handlers = [
  rest.get('/', (_, response, ctx) => {
    return response(ctx.status(200), ctx.json({ data: 'ok' }));
  }),
];
