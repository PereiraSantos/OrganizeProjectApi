"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.getUsers = exports.createUser = void 0;
const userService_1 = require("../service/userService");
const createUser = async (req, res, next) => {
    try {
        const body = req.body;
        const user = { id: Date.now(), email: body.email, password: body.password };
        await userService_1.UserService.initTable();
        await userService_1.UserService.criateUser(body.email, body.password);
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const getUsers = async (req, res, next) => {
    try {
        await userService_1.UserService.initTable();
        const user = await userService_1.UserService.findUserAll();
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const auth = async (req, res, next) => {
    try {
        await userService_1.UserService.initTable();
        const body = req.body;
        const user = await userService_1.UserService.findUserByEmaiByPassword(body.email, body.password);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.auth = auth;
