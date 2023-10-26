import { http } from './http';

export function getMe() {
  return http.get<GetMe>('/api/me');
}

export interface GetMe {
  name: string;
}

export function getCards() {
  return http.get<CardsResponse>('/api/cards');
}

export interface CardsResponse {
  cards: { id: string; src: string; benefit: string }[];
}
