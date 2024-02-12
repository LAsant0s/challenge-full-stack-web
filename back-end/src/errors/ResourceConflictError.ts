export class ResourceConflictError extends Error {
  constructor() {
    super("Invalid operation: a resource with this same identifier already exists in the database");
    this.name = "ResourceConflictError";
  }
}
