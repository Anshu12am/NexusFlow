const express = require("express");
const { healthCheck,receiveTelemetry }= require("../controllers/telemetry.controller");
const validateTelemetryDataMiddleware = require("../middlewares/validateTelemetryData.middleware");
const telemetryRouter = express.Router();


telemetryRouter.get("/health", healthCheck);

telemetryRouter.post("/receive", validateTelemetryDataMiddleware.validateTelemetryData, receiveTelemetry);


module.exports = telemetryRouter;