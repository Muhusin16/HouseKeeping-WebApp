const Category = require("../models/categoryModel")

const multer = require('multer');
const path = require("path");

// Set up Multer for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// CREATE a new category with image upload
const createCategory = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading image" });
    }

    try {
      const { title, description } = req.body;
      const image = req.file ? req.file.filename : null; // Get the uploaded image filename

      // Check if a category with the same title already exists
      const existingCategory = await Category.findOne({ title });

      if (existingCategory) {
        return res.status(400).json({ error: 'Category with this name already exists' });
      }

      const category = new Category({ title, image, description });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Error creating category' });
    }
  });
};

//CREATE a task based on catagory
const createTaskByCategory = async (req, res) => {
  try {
    const { title } = req.body;

    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    // Check if a task with the same name already exists in the category
    const existingTask = category.tasks.find((task) => task.title === title);

    if (existingTask) {
      return res.status(400).json({ error: 'Task with this name already exists in the category' });
    }

    const { description } = req.body; // Assuming you're sending 'description'
    const task = { task, description }; // Create a task object

    category.tasks.push(task);
    // You can update 'numberOfTasks' if needed based on the length of category.tasks
    // category.numberOfTasks = category.tasks.length;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error adding a task' });
  }
};
//GET a category
const getCategory = async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories

    // You can choose which fields you want to include in the response, e.g., exclude tasks
    const categoriesWithoutTasks = categories.map(category => ({
      title: category.title,
      image: category.image,
      description: category.description,
     
    }));

    res.status(200).json(categoriesWithoutTasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};
//GET a task by category
const getTaskByCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // You can choose which fields you want to include in the response, e.g., exclude descriptions
    const tasks = category.tasks.map(task => ({
      name: task.name,
      // Add other task properties as needed
    }));

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

// DELETE Category by ID
const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    await category.remove();
    res.status(204).json(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the category' });
  }
};

// PUT (Update) Category by ID
const updateCategoryById = async (req, res) => {
  try {
    const { title, image, description, isActive } = req.body;
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    category.title = title || category.title;
    category.image = image || category.image;
    category.description = description || category.description;
    category.isActive = isActive || category.isActive;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the category' });
  }
};

// DELETE Task from Category
const deleteTaskById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    // Find the index of the task to remove
    const taskIndex = category.tasks.findIndex((task) => task._id.toString() === req.params.taskId);
    if (taskIndex === -1) {
      res.status(404).json({ error: 'Task not found in the category' });
      return;
    }

    // Remove the task from the tasks array
    category.tasks.splice(taskIndex, 1);

    await category.save();
    res.status(204).json(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the task from the category' });
  }
};
// PUT (Update) Task within a Category
const updateTaskById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    // Find the task to update by its ID
    const task = category.tasks.find((t) => t._id.toString() === req.params.taskId);
    if (!task) {
      res.status(404).json({ error: 'Task not found in the category' });
      return;
    }

    // Update the task properties based on the request body
    if (req.body.name) {
      task.name = req.body.name;
    }
    if (req.body.description) {
      task.description = req.body.description;
    }
    // Add other properties to update as needed

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the task in the category' });
}
};

module.exports = {createCategory, createTaskByCategory, getCategory, getTaskByCategory,
  deleteCategoryById, updateCategoryById, deleteTaskById, updateTaskById}