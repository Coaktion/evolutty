export const calculateBackoffMultiplier = (
  numRetries: number,
  backoffFactor: number
): number => {
  return Math.pow(backoffFactor, numRetries);
};
