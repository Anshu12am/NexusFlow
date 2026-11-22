const { validateGraph } = require("./graph.validator");

module.exports.parseGraph = (graph) => {

    const result = validateGraph(graph);

    if (!result.isValid) {
        return {
            success: false,
            errors: result.errors
        };
    }

    const { nodes, edges } = graph;


    const adjacencyList = {};
    const inDegree = {};

    nodes.forEach((node) => {
        adjacencyList[node.id] = [];
        inDegree[node.id] = 0;
    });



    edges.forEach((edge) => {
        adjacencyList[edge.source].push(edge.target);
        inDegree[edge.target]++;
    });

    const queue = [];

    nodes.forEach((node) => {
        if (inDegree[node.id] === 0) {
            queue.push(node.id);
        }
    });

    const executionOrder = [];

    while (queue.length > 0) {

        const current = queue.shift();

        executionOrder.push(current);

        for (const next of adjacencyList[current]) {

            inDegree[next]--;

            if (inDegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    if (executionOrder.length !== nodes.length) {
        return {
            success: false,
            errors: ["Cycle detected in workflow"]
        };
    }

    const orderedNodes = executionOrder.map((id) =>
        nodes.find((node) => node.id === id)
    );

    return {
        success: true,
        executionOrder,
        orderedNodes
    };
};
