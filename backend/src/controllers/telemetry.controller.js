module.exports.healthCheck = (req, res) => {
  return res.status(200).json({
        success: true,
        message: "Telemetry API is working"
    });
}

module.exports.receiveTelemetry = (req,res)=> {
   try {
        const telemetryData = req.body;

        console.log("Received Telemetry Data:", telemetryData);

        return res.status(200).json({
            success: true,
            message: "Telemetry data received successfully",
            data: telemetryData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


module.exports.receiveBulkTelemetry = async (req, res) => {
    try {
        const { readings } = req.body;

        const result = await storeMultipleTelemetry(readings);

        return res.status(201).json({
            success: true,
            message: "Bulk telemetry data stored successfully",
            insertedCount: result.insertedCount,
            insertedIds: result.insertedIds
        });

    } catch (error) {
        console.error("Bulk telemetry controller error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to store bulk telemetry data"
        });
    }
};