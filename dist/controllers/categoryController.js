"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategorys = exports.createCategory = void 0;
const categoryServicet_1 = require("../service/categoryServicet");
const createCategory = async (req, res, next) => {
    try {
        const body = req.body;
        const category = { id: Date.now(), name: body.name, colorCategory: body.colorCategory };
        await categoryServicet_1.CategoryService.initTable();
        await categoryServicet_1.CategoryService.criateCategory(body.name, body.colorCategory);
        res.status(201).json(category);
    }
    catch (error) {
        next(error);
    }
};
exports.createCategory = createCategory;
const getCategorys = async (req, res, next) => {
    try {
        await categoryServicet_1.CategoryService.initTable();
        const category = await categoryServicet_1.CategoryService.findCategoryAll();
        res.json(category);
    }
    catch (error) {
        next(error);
    }
};
exports.getCategorys = getCategorys;
