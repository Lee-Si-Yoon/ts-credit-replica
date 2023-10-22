export const clamp = (n: number, m: number) => {
  const result = n % m;

  // because JS remainder always takes the sign of the dividend
  // e.g. -1 % 3 === -1
  return result >= 0 ? result : result + m;
};
