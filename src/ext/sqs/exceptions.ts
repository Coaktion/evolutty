export class DeleteMessage extends Error {
  deleteMessage = true;
  constructor(message = 'DeleteMessage') {
    super(message);
  }
}
