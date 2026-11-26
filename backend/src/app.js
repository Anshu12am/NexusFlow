const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const telemetryRouter = require("./routes/telemetry.routes");
app.use("/api/telemetry", telemetryRouter);

const compilerRoutes = require("./routes/compiler.routes");
app.use("/api/compiler", compilerRoutes);


module.exports = app;