import conn from "../utils/db.js";

export default class Task {
    static async getTasks(page, limit, finished, search) {
        let conditions = `title LIKE '%${search}%'`;
        if (finished !== undefined) {
            conditions += ` AND completed = ${finished}`;
        }

        const start = (page - 1) * limit;
        let query = `SELECT * FROM tasks WHERE ${conditions} LIMIT ${start} , ${limit}`;
        const [tasks] = await conn.query(query);

        query = `SELECT COUNT(*) AS total FROM tasks
                UNION ALL
                SELECT COUNT(*) FROM tasks WHERE ${conditions}`;

        let [totals] = await conn.query(query);

        return {
            tasks,
            totalTasks: {
                all: totals[0].total,
                filtered: totals[1].total,
            },
        };
    }

    static async getTaskById(id) {
        const [result] = await conn.query("SELECT * FROM tasks WHERE id = ?", [id]);
        return result.length ? result[0] : false;
    }

    static async getTaskByTitle(title) {
        const [result] = await conn.query("SELECT * FROM tasks WHERE title = ?", [title]);
        return result.length ? result[0] : false;
    }

    static async addTask(title, completed) {
        const [result] = await conn.query(
            "INSERT INTO tasks(title , completed) VALUES(?,?)",
            [title, completed]
        );

        if (result.insertId) {
            return { id: result.insertId, title, completed };
        } else {
            return false;
        }
    }

    static async updateTask(id, title, completed) {
        await conn.query("UPDATE tasks SET title = ? , completed = ? WHERE id = ?", [
            title,
            completed,
            id,
        ]);
        return true;
    }

    static async deleteTask(id) {
        const [result] = await conn.query("DELETE FROM tasks WHERE id = ?", [id]);
        return result.affectedRows;
    }
}
