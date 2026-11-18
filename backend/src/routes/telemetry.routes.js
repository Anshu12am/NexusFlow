const express = require("express");
const { healthCheck,receiveTelemetry,receiveBulkTelemetry }= require("../controllers/telemetry.controller");
const validateTelemetryDataMiddleware = require("../middleware/validateTelemetry.js");
const telemetryRouter = express.Router();


telemetryRouter.get("/health", healthCheck);

telemetryRouter.post("/receive", validateTelemetryDataMiddleware.validateTelemetryData, receiveTelemetry);

telemetryRouter.post("/bulk", validateTelemetryDataMiddleware.validateTelemetryData, receiveBulkTelemetry);


module.exports = telemetryRouter;