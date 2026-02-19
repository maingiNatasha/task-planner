/**
 * Send a successful API response
 * @param {Object} res - Express response object
 * @param {string} message - Message describing the response
 * @param {Object} [data={}] - Optional data to include
 * @param {number} [status=200] - HTTP status code
 * @returns {Object} - JSON response
 */
export const sendSuccess = (res, message, data = {}, status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};

/**
 * Send an error API response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} [status=500] - HTTP status code
 * @returns {Object} - JSON response
 */
export const sendError = (res, message, status = 500) => {
    return res.status(status).json({
        success: false,
        message
    });
};
