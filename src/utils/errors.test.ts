import { describe, expect, it } from 'vitest';
import {
  BadRequestError,
  BusinessLogicError,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalServerError,
  NotFoundError,
  PacificaError,
  RateLimitError,
  ServiceUnavailableError,
} from '../types/errors';
import { handleHttpError, isApiErrorResponse, isApiResponse } from './errors';

describe('Error Utilities', () => {
  describe('handleHttpError', () => {
    it('should throw BadRequestError for 400 status', () => {
      expect(() => handleHttpError(400, 'Bad request')).toThrow(BadRequestError);
      expect(() => handleHttpError(400, 'Bad request')).toThrow('Bad request');
    });

    it('should throw ForbiddenError for 403 status', () => {
      expect(() => handleHttpError(403, 'Forbidden')).toThrow(ForbiddenError);
    });

    it('should throw NotFoundError for 404 status', () => {
      expect(() => handleHttpError(404, 'Not found')).toThrow(NotFoundError);
    });

    it('should throw ConflictError for 409 status', () => {
      expect(() => handleHttpError(409, 'Conflict')).toThrow(ConflictError);
    });

    it('should throw BusinessLogicError for 422 status', () => {
      expect(() => handleHttpError(422, 'Business logic error')).toThrow(BusinessLogicError);
    });

    it('should throw BusinessLogicError with error code for 422 status', () => {
      try {
        handleHttpError(422, 'Business logic error', 1001);
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessLogicError);
        expect((error as BusinessLogicError).code).toBe(1001);
      }
    });

    it('should throw RateLimitError for 429 status', () => {
      expect(() => handleHttpError(429, 'Rate limit exceeded')).toThrow(RateLimitError);
    });

    it('should throw InternalServerError for 500 status', () => {
      expect(() => handleHttpError(500, 'Internal server error')).toThrow(InternalServerError);
    });

    it('should throw ServiceUnavailableError for 503 status', () => {
      expect(() => handleHttpError(503, 'Service unavailable')).toThrow(ServiceUnavailableError);
    });

    it('should throw GatewayTimeoutError for 504 status', () => {
      expect(() => handleHttpError(504, 'Gateway timeout')).toThrow(GatewayTimeoutError);
    });

    it('should throw generic PacificaError for unhandled status codes', () => {
      expect(() => handleHttpError(418, "I'm a teapot")).toThrow(PacificaError);
    });

    it('should preserve error code in thrown errors', () => {
      try {
        handleHttpError(400, 'Bad request', 5000);
      } catch (error) {
        expect((error as BadRequestError).code).toBe(5000);
      }
    });
  });

  describe('isApiErrorResponse', () => {
    it('should return true for valid error response', () => {
      const response = { error: 'Something went wrong', code: 1001 };
      expect(isApiErrorResponse(response)).toBe(true);
    });

    it('should return true for error response without code', () => {
      const response = { error: 'Something went wrong' };
      expect(isApiErrorResponse(response)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isApiErrorResponse(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isApiErrorResponse(undefined)).toBe(false);
    });

    it('should return false for non-object types', () => {
      expect(isApiErrorResponse('string')).toBe(false);
      expect(isApiErrorResponse(123)).toBe(false);
      expect(isApiErrorResponse(true)).toBe(false);
    });

    it('should return false for object without error field', () => {
      const response = { message: 'Something went wrong', code: 1001 };
      expect(isApiErrorResponse(response)).toBe(false);
    });

    it('should return false for object with non-string error', () => {
      const response = { error: 123, code: 1001 };
      expect(isApiErrorResponse(response)).toBe(false);
    });
  });

  describe('isApiResponse', () => {
    it('should return true for valid success response', () => {
      const response = {
        success: true,
        data: { value: 'test' },
        error: null,
        code: null,
      };
      expect(isApiResponse(response)).toBe(true);
    });

    it('should return true for valid error response', () => {
      const response = {
        success: false,
        data: null,
        error: 'Something went wrong',
        code: 1001,
      };
      expect(isApiResponse(response)).toBe(true);
    });

    it('should return true for response with minimal fields', () => {
      const response = {
        success: true,
        data: {},
      };
      expect(isApiResponse(response)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isApiResponse(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isApiResponse(undefined)).toBe(false);
    });

    it('should return false for non-object types', () => {
      expect(isApiResponse('string')).toBe(false);
      expect(isApiResponse(123)).toBe(false);
      expect(isApiResponse(true)).toBe(false);
    });

    it('should return false for object without success field', () => {
      const response = { data: {}, error: null, code: null };
      expect(isApiResponse(response)).toBe(false);
    });

    it('should return false for object without data field', () => {
      const response = { success: true, error: null, code: null };
      expect(isApiResponse(response)).toBe(false);
    });

    it('should return false for object with non-boolean success', () => {
      const response = { success: 'true', data: {} };
      expect(isApiResponse(response)).toBe(false);
    });
  });
});
