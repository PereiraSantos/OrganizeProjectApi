"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getTasks = exports.createTask = void 0;
const taskService_1 = require("../service/taskService");
const createTask = async (req, res, next) => {
    try {
        const body = req.body;
        const task = { id: Date.now(), name: body.name, description: body.description, idCategory: body.idCategory, idProject: body.idProject, status: body.status };
        await taskService_1.TaskService.initTable();
        await taskService_1.TaskService.criateTask(body.name, body.description, body.idCategory, body.idProject, 0);
        res.status(201).json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.createTask = createTask;
const getTasks = async (req, res, next) => {
    try {
        await taskService_1.TaskService.initTable();
        let idProject = req.query.idProject;
        const task = await taskService_1.TaskService.findTaskAll(idProject);
        res.json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.getTasks = getTasks;
const updateStatus = async (req, res, next) => {
    try {
        await taskService_1.TaskService.initTable();
        const body = req.body;
        const task = { id: body.id, status: body.status };
        await taskService_1.TaskService.updateStatus(body.id, body.status);
        res.status(201).json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.updateStatus = updateStatus;
