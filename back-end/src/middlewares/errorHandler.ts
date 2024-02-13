import { Request, Response } from 'express';
import { PaginationRequestError } from '../errors/PaginationRequestError';
import { ResourceConflictError } from '../errors/ResourceConflictError';
import { InvalidRequestError } from '../errors/InvalidRequestError';
import { ResourceNotFound } from '../errors/ResourceNotFound';


function errorHandler(error: Error, _request: Request, response: Response, _next: Function) {
  switch (error.name) {
    case PaginationRequestError.name:
    case InvalidRequestError.name:
      return response.status(400).json({ status: 400, error: error.message });

    case ResourceNotFound.name:
      return response.status(404).json({ status: 404, error: error.message });

    case ResourceConflictError.name:
      return response.status(409).json({ status: 409, error: error.message });

    default:
      return response.status(500).json({ status: 500, error: 'An internal error has occurred' });
  }
}

export { errorHandler };
