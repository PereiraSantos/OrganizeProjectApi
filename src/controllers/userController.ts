import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { UserService } from '../service/userService';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const user: User = { id: Date.now(), email: body.email, password: body.password };
        await UserService.initTable();
        await UserService.criateUser(body.email, body.password);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await UserService.initTable();
        const user = await UserService.findUserAll();
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await UserService.initTable();
        const body = req.body;
        const user = await UserService.findUserByEmaiByPassword(body.email, body.password);
        res.json(user);
    } catch (error) {
        next(error);
    }
};
