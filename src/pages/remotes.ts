import { http } from './http';

export function getMe() {
  return http.get<GetMe>('/api/me');
}

export interface GetMe {
  name: string;
}
