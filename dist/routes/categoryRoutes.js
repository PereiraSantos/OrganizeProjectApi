"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const router = (0, express_1.Router)();
router.post('/', categoryController_1.createCategory);
router.get('/', categoryController_1.getCategorys);
exports.default = router;
