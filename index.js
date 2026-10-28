import "./instrument.js";
import "dotenv/config";
import express from "express";
import * as Sentry from "@sentry/node";
import usersRouter from "./src/routes/users.js";
import hostsRouter from "./src/routes/hosts.js";
import bookingsRouter from "./src/routes/bookings.js";
import propertiesRouter from "./src/routes/properties.js";
import amenitiesRouter from "./src/routes/amenities.js";
import reviewsRouter from "./src/routes/reviews.js";
import loginRouter from "./src/routes/login.js";
import logs from "./middleware/logMiddleware.js";
import notFoundErrorHandler from "./middleware/notFoundErrorHandler.js";
import errorHandler from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 3000;
const app = express();

// Global middleware
app.use(express.json());
app.use(logs);

// Resource routes
app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/amenities", amenitiesRouter);
app.use("/hosts", hostsRouter);
app.use("/reviews", reviewsRouter);
app.use("/properties", propertiesRouter);

// Login
app.use("/login", loginRouter);
// Handle requests to unknown routes
app.use(notFoundErrorHandler);
// Report errors to Sentry
Sentry.setupExpressErrorHandler(app);
// Handle errors and send responses
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log('Resources:');
  console.log(`Server is listening on port ${port}`);
  console.log(`Server is running on http://localhost:${port}`);
});
