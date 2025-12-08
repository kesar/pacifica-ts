import {
  BadRequestError,
  BusinessLogicError,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  getBusinessLogicErrorMessage,
  InternalServerError,
  NotFoundError,
  PacificaError,
  RateLimitError,
  ServiceUnavailableError,
} from '../types/index.js';

export function handleHttpError(statusCode: number, message: string, code?: number): never {
  switch (statusCode) {
    case 400:
      throw new BadRequestError(message, code);
    case 403:
      throw new ForbiddenError(message);
    case 404:
      throw new NotFoundError(message);
    case 409:
      throw new ConflictError(message);
    case 422: {
      const errorMessage = code !== undefined ? getBusinessLogicErrorMessage(code) : message;
      throw new BusinessLogicError(errorMessage, code || 0);
    }
    case 429:
      throw new RateLimitError(message);
    case 500:
      throw new InternalServerError(message);
    case 503:
      throw new ServiceUnavailableError(message);
    case 504:
      throw new GatewayTimeoutError(message);
    default:
      throw new PacificaError(message, code, statusCode);
  }
}

export function isApiErrorResponse(data: unknown): data is { error: string; code: number } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'error' in data &&
    typeof (data as { error: unknown }).error === 'string'
  );
}

export function isApiResponse<T>(
  data: unknown
): data is { success: boolean; data: T; error: string | null; code: number | null } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'success' in data &&
    typeof (data as { success: unknown }).success === 'boolean' &&
    'data' in data
  );
}
