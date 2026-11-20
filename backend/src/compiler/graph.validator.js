const { NODE_TYPES } = require("./graph.constants");

module.exports.validateGraph = (graph) => {
    const errors = [];

      if (!graph || typeof graph !== "object" || Array.isArray(graph)) {
        return {
            isValid: false,
            errors: ["Invalid graph object"]
        };
    }

    const { nodes, edges } = graph;

    if (!Array.isArray(nodes)) {
        errors.push("Nodes must be an array");
    }

    if (!Array.isArray(edges)) {
        errors.push("Edges must be an array");
    }

    if (errors.length > 0) {
        return { isValid: false, errors };
    }

    const nodeIds = new Set();
    const supportedTypes = Object.values(NODE_TYPES);

    // 3. Validate nodes
    nodes.forEach((node, index) => {

        if (!node || typeof node !== "object" || Array.isArray(node)) {
            errors.push(`Node at index ${index} is invalid`);
            return;
        }

        if (typeof node.id !== "string" || !node.id.trim()) {
            errors.push(`Node at index ${index} has an invalid ID`);
        } else if (nodeIds.has(node.id)) {
            errors.push(`Duplicate node ID: ${node.id}`);
        } else {
            nodeIds.add(node.id);
        }

        if (!supportedTypes.includes(node.type)) {
            errors.push(`Unsupported node type: ${node.type}`);
        }
    });


    edges.forEach((edge, index) => {

        if (!edge || typeof edge !== "object" || Array.isArray(edge)) {
            errors.push(`Edge at index ${index} is invalid`);
            return;
        }

        if (!nodeIds.has(edge.source)) {
            errors.push(`Invalid source node ID: ${edge.source}`);
        }

        if (!nodeIds.has(edge.target)) {
            errors.push(`Invalid target node ID: ${edge.target}`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
};

