const { parseGraph } = require("./graph.parser");

module.exports.compileGraph = (graph) => {

    // STEP 1: Parse graph
    const parsed = parseGraph(graph);

    if (!parsed.success) {
        return parsed;
    }

    const { orderedNodes } = parsed;

    // STEP 2: Create execution steps
    const steps = orderedNodes.map((node) => {

        // Find dependencies of current node
        const dependencies = graph.edges
            .filter((edge) => edge.target === node.id)
            .map((edge) => edge.source);

        return {
            nodeId: node.id,
            nodeType: node.type,
            dependsOn: dependencies,
            config: node.data || {}
        };
    });

    // STEP 3: Return compiled workflow
    return {
        success: true,
        totalSteps: steps.length,
        executionPlan: steps
    };
};
