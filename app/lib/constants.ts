// lib/constants.ts
export const CURRENCIES = ['USD', 'PKR', 'EUR'] as const;
export type Currency = (typeof CURRENCIES)[number];
