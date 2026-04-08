import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../service/taskService';
import { Task } from '../models/task';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const task: Task = { id: Date.now(), name: body.name, description: body.description, idCategory: body.idCategory, status: body.status };
        await TaskService.initTable();
        await TaskService.criateTask(body.name, body.description, body.idCategory, 0);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await TaskService.findTaskAll();
        res.json(task);
    } catch (error) {
        next(error);
    }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const task: any = { id: body.id, status: body.status };
        await TaskService.updateStatus(body.id, body.status);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

