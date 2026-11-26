const express = require("express");

const compilerRouter = express.Router();

const {
    compileWorkflow
} = require("../controllers/compiler.controller");

compilerRouter.post("/compile", compileWorkflow);

module.exports = compilerRouter;
