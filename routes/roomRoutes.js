const express = require("express");
const router = express.Router();
const { createCategory, createTaskByCategory, getCategory, getTaskByCategory, deleteCategoryById, updateCategoryById,
    deleteTaskById, updateTaskById } = require("../controllers/roomController");

router.post("/api/categories", createCategory);
router.post("/api/categories/:categoryId/tasks",  createTaskByCategory);

router.get("/api/categories",  getCategory);
router.get("/api/categories/:categoryId/tasks", getTaskByCategory);

router.delete("/api/categories/:categoryId",  deleteCategoryById);
router.delete("/api/categories/:categoryId/tasks/:taskId", deleteTaskById);

router.put("/api/categories/:categoryId", updateCategoryById);
router.put("/api/categories/:categoryId/tasks/:taskId",  updateTaskById);

module.exports = router;
