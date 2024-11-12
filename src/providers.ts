abstract class AbstractProvider {
  abstract fetchMessages(): Promise<object[]>;

  abstract confirmMessage(message: object): Promise<any>;

  abstract messageNotProcessed(message: object): Promise<any>;

  abstract stop(): void;
}

export default AbstractProvider;
