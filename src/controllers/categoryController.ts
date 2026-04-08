import { Request, Response, NextFunction } from 'express';
import { Category } from '../models/category';
import { CategoryService } from '../service/categoryServicet';

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const category: Category = { id: Date.now(), name: body.name, colorCategory: body.colorCategory };
        await CategoryService.initTable();
        await CategoryService.criateCategory(body.name, body.colorCategory);
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};

export const getCategorys = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryService.findCategoryAll();
        res.json(category);
    } catch (error) {
        next(error);
    }
};
