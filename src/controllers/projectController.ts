import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/project';
import { ProjectService } from '../service/projectService';

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const project: Project = { id: Date.now(), name: body.name, description: body.description };
        await ProjectService.initTable();
        await ProjectService.criateProject(body.name, body.description);
        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
};

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const project = await ProjectService.findProjectAll();
        res.json(project);
    } catch (error) {
        next(error);
    }
};