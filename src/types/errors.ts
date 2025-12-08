export class PacificaError extends Error {
  constructor(
    message: string,
    public readonly code?: number,
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = 'PacificaError';
    Object.setPrototypeOf(this, PacificaError.prototype);
  }
}

export class BadRequestError extends PacificaError {
  constructor(message: string, code?: number) {
    super(message, code, 400);
    this.name = 'BadRequestError';
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class ForbiddenError extends PacificaError {
  constructor(message: string = 'Forbidden: no access code/restricted region') {
    super(message, undefined, 403);
    this.name = 'ForbiddenError';
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends PacificaError {
  constructor(message: string = 'Resource not found') {
    super(message, undefined, 404);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ConflictError extends PacificaError {
  constructor(message: string = 'Conflict') {
    super(message, undefined, 409);
    this.name = 'ConflictError';
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class BusinessLogicError extends PacificaError {
  constructor(message: string, code: number) {
    super(message, code, 422);
    this.name = 'BusinessLogicError';
    Object.setPrototypeOf(this, BusinessLogicError.prototype);
  }
}

export class RateLimitError extends PacificaError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, undefined, 429);
    this.name = 'RateLimitError';
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

export class InternalServerError extends PacificaError {
  constructor(message: string = 'Internal server error') {
    super(message, undefined, 500);
    this.name = 'InternalServerError';
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class ServiceUnavailableError extends PacificaError {
  constructor(message: string = 'Service unavailable') {
    super(message, undefined, 503);
    this.name = 'ServiceUnavailableError';
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}

export class GatewayTimeoutError extends PacificaError {
  constructor(message: string = 'Gateway timeout') {
    super(message, undefined, 504);
    this.name = 'GatewayTimeoutError';
    Object.setPrototypeOf(this, GatewayTimeoutError.prototype);
  }
}

export class WebSocketError extends PacificaError {
  constructor(message: string, code?: number) {
    super(message, code);
    this.name = 'WebSocketError';
    Object.setPrototypeOf(this, WebSocketError.prototype);
  }
}

export enum BusinessLogicErrorCode {
  UNKNOWN = 0,
  ACCOUNT_NOT_FOUND = 1,
  BOOK_NOT_FOUND = 2,
  INVALID_TICK_LEVEL = 3,
  INSUFFICIENT_BALANCE = 4,
  ORDER_NOT_FOUND = 5,
  OVER_WITHDRAWAL = 6,
  INVALID_LEVERAGE = 7,
  CANNOT_UPDATE_MARGIN = 8,
  POSITION_NOT_FOUND = 9,
  POSITION_TPSL_LIMIT_EXCEEDED = 10,
}

export enum WebSocketErrorCode {
  SUCCESS_CODE = 200,
  INVALID_REQUEST_CODE = 400,
  INVALID_SIGNATURE_CODE = 401,
  INVALID_SIGNER_CODE = 402,
  UNAUTHORIZED_REQUEST_CODE = 403,
  ENGINE_ERROR_CODE = 420,
  RATE_LIMIT_EXCEEDED_CODE = 429,
  UNKNOWN_ERROR_CODE = 500,
}

export function getBusinessLogicErrorMessage(code: number): string {
  switch (code) {
    case BusinessLogicErrorCode.UNKNOWN:
      return 'Unknown error';
    case BusinessLogicErrorCode.ACCOUNT_NOT_FOUND:
      return 'Account not found';
    case BusinessLogicErrorCode.BOOK_NOT_FOUND:
      return 'Order book not found';
    case BusinessLogicErrorCode.INVALID_TICK_LEVEL:
      return 'Invalid tick level';
    case BusinessLogicErrorCode.INSUFFICIENT_BALANCE:
      return 'Insufficient balance';
    case BusinessLogicErrorCode.ORDER_NOT_FOUND:
      return 'Order not found';
    case BusinessLogicErrorCode.OVER_WITHDRAWAL:
      return 'Withdrawal amount exceeds available balance';
    case BusinessLogicErrorCode.INVALID_LEVERAGE:
      return 'Invalid leverage';
    case BusinessLogicErrorCode.CANNOT_UPDATE_MARGIN:
      return 'Cannot update margin';
    case BusinessLogicErrorCode.POSITION_NOT_FOUND:
      return 'Position not found';
    case BusinessLogicErrorCode.POSITION_TPSL_LIMIT_EXCEEDED:
      return 'Position TP/SL limit exceeded';
    default:
      return `Unknown business logic error (code: ${code})`;
  }
}
