import { DeleteMessage } from '../../../src/exceptions';

describe('DeleteMessage', () => {
  it('should have a deleteMessage property set to true', () => {
    const error = new DeleteMessage('Test');
    expect(error.deleteMessage).toEqual(true);
    expect(error.message).toEqual('Test');
  });

  it('should have a default message', () => {
    const error = new DeleteMessage();
    expect(error.deleteMessage).toEqual(true);
    expect(error.message).toEqual('DeleteMessage');
  });
});
