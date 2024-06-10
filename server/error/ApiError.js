class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }
    static error404_badRequest(message) {
        return new ApiError(404, message)
    }
    static error500_internal(message) {
        return new ApiError(500, message)
    }
    static error404_forbidden(message) {
        return new ApiError(403, message)
    }

}

module.exports = ApiError