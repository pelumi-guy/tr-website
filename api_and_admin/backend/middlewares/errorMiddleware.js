// middleware/errorMiddleware.js
import ErrorHandler from '../utils/errorHandler.js';

// --- Helper functions for specific error types ---

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new ErrorHandler(message, 400); // 400 Bad Request
};

const handleDuplicateFieldsDB = (err) => {
    // Extract the value from the error message using a regex
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new ErrorHandler(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new ErrorHandler(message, 400);
};

const handleJWTError = () => new ErrorHandler('Invalid token. Please log in again!', 401);
const handleJWTExpiredError = () => new ErrorHandler('Your token has expired! Please log in again.', 401);


// --- Main error sending functions ---

const sendErrorDev = (err, res) => {
    // For development, send a detailed error response
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    // For production, only send operational, trusted errors to the client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        // For programming or unknown errors, don't leak details
        console.error('ERROR 💥', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};

// --- The Global Error Handling Middleware ---

export default (err, req, res, next) => {
    // Set default status code and status if not already defined
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (JSON.stringify((process.env.NODE_ENV).trim()) === JSON.stringify("DEVELOPMENT")) {
        sendErrorDev(err, res);
    } else if (JSON.stringify((process.env.NODE_ENV).trim()) === JSON.stringify("PRODUCTION")) {
        // Create a hard copy of the error object
        let error = {...err, name: err.name, message: err.message, errmsg: err.errmsg };

        // Handle specific Mongoose errors and convert them to operational errors
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

        sendErrorProd(error, res);
    }
};