const { validateGraph } = require("../src/compiler/graph.validator");
const graph = require("./sample-workflow.json");


// TEST 1: Valid graph
const validResult = validateGraph(graph);

console.log("TEST 1: Valid Graph");
console.log(validResult);

if (validResult.isValid) {
    console.log("PASS: Valid graph accepted\n");
} else {
    console.log("FAIL: Valid graph rejected\n");
}


const missingNodes = {
    edges: []
};

console.log("TEST 2: Missing Nodes");
console.log(validateGraph(missingNodes));


const duplicateIds = {
    nodes: [
        { id: "node-1", type: "dataSource" },
        { id: "node-1", type: "mathOperation" }
    ],
    edges: []
};

console.log("\nTEST 3: Duplicate Node IDs");
console.log(validateGraph(duplicateIds));

const invalidType = {
    nodes: [
        { id: "node-1", type: "unknownNode" }
    ],
    edges: []
};

console.log("\nTEST 4: Unsupported Node Type");
console.log(validateGraph(invalidType));


const invalidSource = {
    nodes: [
        { id: "node-1", type: "dataSource" }
    ],
    edges: [
        { source: "node-5", target: "node-1" }
    ]
};

console.log("\nTEST 5: Invalid Source ID");
console.log(validateGraph(invalidSource));

const invalidTarget = {
    nodes: [
        { id: "node-1", type: "dataSource" }
    ],
    edges: [
        { source: "node-1", target: "node-5" }
    ]
};

console.log("\nTEST 6: Invalid Target ID");
console.log(validateGraph(invalidTarget));

console.log("\n========== TESTING COMPLETED ==========\n");
