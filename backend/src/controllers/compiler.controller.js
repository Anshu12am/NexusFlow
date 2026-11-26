const { compileGraph } = require("../compiler/compiler.service");

module.exports.compileWorkflow = (req, res) => {
    try {
        const { graph } = req.body;

        if (!graph) {
            return res.status(400).json({
                success: false,
                message: "Workflow graph is required"
            });
        }

        const result = compileGraph(graph);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Workflow compilation failed",
                errors: result.errors
            });
        }

        return res.status(200).json({
            success: true,
            message: "Workflow compiled successfully",
            totalSteps: result.totalSteps,
            executionPlan: result.executionPlan
        });

    } catch (error) {
        console.error("Compiler Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal compiler error"
        });
    }
};
