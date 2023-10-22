import { http } from './http';

export function getMe() {
  return http.get<GetMe>('/api/me');
}

export interface GetMe {
  name: string;
}

export function getCards() {
  return http.get<GetCards>('/api/cards');
}

export interface GetCards {
  cards: { id: string; src: string; benefit: string }[];
}
