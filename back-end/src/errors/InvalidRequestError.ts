export class InvalidRequestError extends Error {
  constructor() {
    super("Invalid operation: the request contains invalid parameters or is missing required fields");
    this.name = "InvalidRequestError";
  }
}
