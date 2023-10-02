export class ValidationMiddlewareError extends Error {
    constructor(...params) {
      super(...params);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ValidationMiddlewareError);
      }
    }
  }

 export class LoginError extends Error { 
    constructor(...params) {
      super(...params);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, LoginError);
      }
    }
  }
