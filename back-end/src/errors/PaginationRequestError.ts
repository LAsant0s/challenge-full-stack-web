export class PaginationRequestError extends Error {
  constructor() {
    super('Invalid paging parameters: page and limit must be positive integers');
    this.name = 'PaginationRequestError';
  }
}
