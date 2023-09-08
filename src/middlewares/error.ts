import { NextFunction, Request, Response } from "express";

export function notFound(
  request: Request,
  response: Response,
  _next: NextFunction
) {
  const { method, url } = request;
  const message = `${method.toUpperCase()} ${url} not found.`;
  response.status(404).json({ message, method, url, statusCode: 404 });
}

export function catchAllError(
  error: Error & { statusCode?: number },
  request: Request,
  response: Response,
  _next: NextFunction
) {
  const { method, url } = request;
  const message =
    error.message || `An unexpected error occured! Please try again.`;
  const statusCode = error.statusCode || 500;
  response.status(statusCode).json({ message, method, statusCode, url });
}
