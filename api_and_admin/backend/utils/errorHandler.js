// utils/errorHandler.js

/**
 * A custom error class for handling operational errors (expected errors).
 * This allows us to easily identify errors that should be sent to the client
 * versus unexpected server errors.
 */
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message); // Call the parent Error constructor
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Mark this as a trusted, operational error

        // Capture the stack trace, excluding the constructor call from it
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;