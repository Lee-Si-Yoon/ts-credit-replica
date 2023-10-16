import { rest } from 'msw';

export const handlers = () => {
  return [rest.get('/api/me', getMe)];
};

const getMe: Parameters<typeof rest.get>[1] = (_, response, ctx) => {
  return response(
    ctx.status(200),
    ctx.json({
      name: '이시윤',
    })
  );
};
