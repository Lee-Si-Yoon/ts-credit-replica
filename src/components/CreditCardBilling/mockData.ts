import type { CreditCardBilling } from './CreditCardBilling';

export const mockData: Record<'data', CreditCardBilling[]> = {
  data: [
    { category: 'shopping', value: 791 },
    { category: 'transfer', value: 216 },
    { category: 'food', value: 450 },
  ],
};
