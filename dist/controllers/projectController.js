"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = exports.createProject = void 0;
const projectService_1 = require("../service/projectService");
const createProject = async (req, res, next) => {
    try {
        const body = req.body;
        const project = { id: Date.now(), name: body.name, description: body.description };
        await projectService_1.ProjectService.initTable();
        await projectService_1.ProjectService.criateProject(body.name, body.description);
        res.status(201).json(project);
    }
    catch (error) {
        next(error);
    }
};
exports.createProject = createProject;
const getProjects = async (req, res, next) => {
    try {
        await projectService_1.ProjectService.initTable();
        const project = await projectService_1.ProjectService.findProjectAll();
        res.json(project);
    }
    catch (error) {
        next(error);
    }
};
exports.getProjects = getProjects;
