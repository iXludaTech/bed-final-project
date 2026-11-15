import * as Sentry from "@sentry/node";
import logger from "../src/utils/log.js";

const errorHandler = (err, req, res, next) => {
    logger.error("Unhandled error", {
        method: req.method,
        url: req.originalUrl,
        message: err.message,
        code: err.code,
    });

    Sentry.captureException(err);

    if (res.headersSent) {
        return next(err);
    }

    // Prisma unique constraint violation
    if (err.code === "P2002") {
        const field = err.meta?.target;

        if (field?.includes("username")) {
            return res.status(409).json({
                message: "Username already exists.",
            });
        }

        if (field?.includes("email")) {
            return res.status(409).json({
                message: "Email address already exists.",
            });
        }

        return res.status(409).json({
            message: "A record with this unique value already exists.",
        });
    }

    // Resource not found
    if (err.name === "NotFoundError") {
        return res.status(404).json({
            message: err.message || "Resource not found.",
        });
    }

    // Other errors
    return res.status(err.status || 500).json({
        message: "An error occurred on the server, please double-check your request!",
    });
};

export default errorHandler;
