module.exports.validateTelemetryData = (req, res, next) => {

     if (
        Object.prototype.hasOwnProperty.call(req.body, "readings") &&
        !Array.isArray(req.body.readings)
    ) {
        return res.status(400).json({
            success: false,
            message: "Readings must be an array"
        });
    }
    
    const readings = Array.isArray(req.body.readings)
        ? req.body.readings
        : [req.body];


        if (readings.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Readings array cannot be empty"
        });
    }

    for(let i=0; i<readings.length; i++){
  const { deviceId, temperature, humidity, timestamp } = readings[i];

  if (!deviceId || typeof deviceId !== "string" || !deviceId.trim()){
        return res.status(400).json({
            success: false,
            message: `Invalid deviceId at index ${i}`
        });
    }

    if (typeof temperature !== "number" || !Number.isFinite(temperature)) {
        return res.status(400).json({
            success: false,
            message: `Invalid temperature at index ${i}`
        });
    }

    if (typeof humidity !== "number" || !Number.isFinite(humidity)) {
        return res.status(400).json({
            success: false,
            message: `Invalid humidity at index ${i}`
        });
    }

    if (typeof timestamp !== "string" || !timestamp.trim() || Number.isNaN(Date.parse(timestamp))) {
        return res.status(400).json({
            success: false,
            message: `Invalid timestamp at index ${i}`
        });
    }
}

    next();
  }

    