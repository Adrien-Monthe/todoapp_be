const Task = require('../model/task');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({where: {UserId: req.userId}});
        res.json(tasks);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch tasks'});
    }
};

exports.createTask = async (req, res) => {
    try {
        const {title, description, isCompleted} = req.body;
        const task = await Task.create({
            title,
            description,
            isCompleted: isCompleted ?? false,
            UserId: req.userId
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({error: 'Failed to create task'});
    }
};

exports.updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findOne({where: {id, UserId: req.userId}});

        if (!task) {
            return res.status(404).json({error: 'Task not found'});
        }

        const {title, description} = req.body;
        task.title = title ?? task.title;
        task.description = description ?? task.description;

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({error: 'Failed to update task'});
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Task.destroy({
            where: {id, UserId: req.userId}
        });

        if (deleted === 0) {
            return res.status(404).json({error: 'Task not found or User cannot delete the selected task'});
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({error: 'Failed to delete task'});
    }
};

exports.markAsCompleted = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findOne({where: {id, UserId: req.userId}});

        if (!task) {
            return res.status(404).json({error: 'Task not found or not yours'});
        }

        task.isCompleted = true;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({error: 'Failed to mark task as completed'});
    }
};
