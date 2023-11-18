import { amber, indigo, tomato } from '@radix-ui/colors';
import type { Category } from './CreditCardBilling';

type CreditCardBillingPallete = {
  [key in Category]: React.CSSProperties['color'];
};

export const pallete: CreditCardBillingPallete = {
  shopping: tomato.tomato9,
  transfer: indigo.indigo9,
  food: amber.amber9,
};
