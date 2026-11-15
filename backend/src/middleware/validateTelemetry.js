module.exports.validateTelemetryData = (req, res, next) => {
  const { deviceId, temperature, humidity, timestamp } = req.body;

  if (!deviceId || typeof deviceId !== "string" || !deviceId.trim()){
        return res.status(400).json({
            success: false,
            message: "Valid deviceId is required"
        });
    }

    if (typeof temperature !== "number" || !Number.isFinite(temperature)) {
        return res.status(400).json({
            success: false,
            message: "Temperature must be a valid number"
        });
    }

    if (typeof humidity !== "number" || !Number.isFinite(humidity)) {
        return res.status(400).json({
            success: false,
            message: "Humidity must be a valid number"
        });
    }

    if (typeof timestamp !== "string" || !timestamp.trim() || Number.isNaN(Date.parse(timestamp))) {
        return res.status(400).json({
            success: false,
            message: "Valid timestamp is required"
        });
    }

    next();
  }

    