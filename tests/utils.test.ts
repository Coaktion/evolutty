import { calculateBackoffMultiplier } from '../src';

describe('calculateBackoffMultiplier', () => {
  it('should return the correct backoff multiplier', () => {
    // Define alguns casos de teste com valores de entrada e valores esperados
    const testCases = [
      { numRetries: 0, backoffFactor: 2, expected: 1 },
      { numRetries: 1, backoffFactor: 2, expected: 2 },
      { numRetries: 2, backoffFactor: 2, expected: 4 },
      { numRetries: 3, backoffFactor: 3, expected: 27 }
    ];

    // Itera sobre os casos de teste e verifica se a função retorna o valor esperado
    testCases.forEach(({ numRetries, backoffFactor, expected }) => {
      const result = calculateBackoffMultiplier(numRetries, backoffFactor);
      expect(result).toEqual(expected);
    });
  });
});
