export class DeleteMessage extends Error {
  deleteMessage = true;
  constructor(message: string) {
    message = message || 'DeleteMessage';
    super(message);
  }
}
