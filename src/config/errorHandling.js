// Global Error Handler Middleware
const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack); // Logs error details for debugging

    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error: {
            message: errorMessage,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        },
    });
};

// Custom Error Class for Better Control
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { globalErrorHandler, AppError };
