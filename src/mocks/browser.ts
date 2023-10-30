import { setupWorker } from 'msw';
import { handlers } from '@mocks/Handlers';

export const worker = setupWorker(...handlers());
