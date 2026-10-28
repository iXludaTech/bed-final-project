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

  if (err.code === "P2002") {
    return res.status(409).json({
      message: "An error occurred on the server, please double-check your request!",
    });
  }

  if (err.name === "NotFoundError") {
    return res.status(404).json({
      message: err.message || "An error occurred on the server, please double-check your request!",
    });
  }

  res.status(err.status || 500).json({
    message: "An error occurred on the server, please double-check your request!",
  });
};

export default errorHandler;
