export class ResourceNotFound extends Error {
  constructor() {
    super("Invalid operation: the requested resource does not exist in the database");
    this.name = "ResourceNotFound";
  }
}
