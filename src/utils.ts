export const calculateBackoffMultiplier = (
  numRetries: number,
  backoffFactor: number
): number => {
  return Math.pow(backoffFactor, numRetries);
};

export const timeout = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
