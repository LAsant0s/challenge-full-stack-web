import { Request, Response } from 'express';
import { PaginationRequestError } from '../errors/PaginationRequestError';


function errorHandler(error: Error, _request: Request, response: Response, _next: Function) {
  switch (error.name) {
    case PaginationRequestError.name:
      return response.status(400).json({ status: 400, error: error.message });

    default:
      return response.status(500).json({ status: 500, error: 'An internal error has occurred' });
  }
}

export { errorHandler };
