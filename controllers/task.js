import Task from "../models/task.js";

export default class TaskController {
    static async getTasks(req, res) {
        let page = 1,
            limit = 4,
            finished = undefined,
            search = "";

        if (req.query.page > 0) {
            page = parseInt(req.query.page);
        }
        if (req.query.limit > 0) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.search) {
            search = req.query.search;
        }
        if (req.query.finished === "true" || req.query.finished === "false") {
            finished = req.query.finished === "true" ? true : false;
        }

        try {
            const result = await Task.getTasks(page, limit, finished, search);

            res.json({
                success: true,
                body: result.tasks,
                message: "All tasks fetched",
                totalTasks: result.totalTasks,
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                body: null,
                message: "Internal Server Error",
            });
        }
    }

    static async getTaskById(req, res) {
        try {
            const task = await Task.getTaskById(req.params.id);
            if (task) {
                res.json({
                    success: true,
                    body: task,
                    message: "The task fetched successfully",
                });
            } else {
                res.status(404).json({
                    success: false,
                    body: null,
                    message: "Task not found",
                });
            }
        } catch (e) {
            res.status(500).json({
                success: false,
                body: null,
                message: "Internal Server Error",
            });
        }
    }

    static async addTask(req, res) {
        if (req.body.title) {
            const title = req.body.title;
            const completed = req.body.completed ? true : false;

            if (title.length < 3) {
                return res.status(400).json({
                    success: false,
                    body: null,
                    message: "Title must contains 3 characters or more",
                });
            }
            //  else if (await Task.getTaskByTitle(title)) {
            //     return res.status(409).json({
            //         success: false,
            //         body: null,
            //         message: "A task already exists with this title",
            //     });
            // }

            try {
                const task = await Task.addTask(title, completed);
                res.status(201).json({
                    success: true,
                    body: task,
                    message: "Task created",
                });
            } catch (e) {
                if (e.errno === 1062) {
                    return res.status(409).json({
                        success: false,
                        body: null,
                        message: "A task already exists with this title",
                    });
                }
                res.status(500).json({
                    success: false,
                    body: null,
                    message: "Internal Server Error",
                });
            }
        } else {
            res.status(400).json({
                success: false,
                body: null,
                message: "Please send new task title",
            });
        }
    }

    static async updateTask(req, res) {
        if (req.body.title && req.body.completed !== undefined) {
            const { title, completed } = req.body;

            if (title.length < 3) {
                return res.status(400).json({
                    success: false,
                    body: null,
                    message: "Title must contains 3 characters or more",
                });
            }

            let task = await Task.getTaskByTitle(title);
            if (task && task.id != req.params.id) {
                return res.status(409).json({
                    success: false,
                    body: null,
                    message: "A task already exists with this title",
                });
            }

            task = await Task.getTaskById(req.params.id);
            if (task) {
                try {
                    await Task.updateTask(task.id, title, completed);
                    res.json({
                        success: true,
                        body: null,
                        message: "Task updated",
                    });
                } catch (e) {
                    res.status(500).json({
                        success: false,
                        body: null,
                        message: "Internal Server Error",
                    });
                }
            } else {
                res.status(404).json({
                    success: false,
                    body: null,
                    message: "Task not found",
                });
            }
        } else {
            res.status(400).json({
                success: false,
                body: null,
                message: "Please provide 'title' and 'completed'",
            });
        }
    }

    static async deleteTask(req, res) {
        try {
            if (await Task.deleteTask(req.params.id)) {
                res.json({
                    success: true,
                    body: null,
                    message: "The task deleted",
                });
            } else {
                res.status(404).json({
                    success: false,
                    body: null,
                    message: "Task not found",
                });
            }
        } catch (e) {
            res.status(500).json({
                success: false,
                body: null,
                message: "Internal Server Error",
            });
        }
    }
}
