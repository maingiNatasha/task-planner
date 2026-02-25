import pool from "../db/pool.js";

// Get tasks
export const getTasks = async (id) => {
    const [result] = await pool.query("SELECT * FROM tasks WHERE user_id = ?", [id]);
    console.log(result);
    return result;
};

// Insert task
export const insertTask = async (userId, data) => {
    const { title, description, category, deadline, status } = data;

    const [result] = await pool.query("INSERT INTO tasks (user_id, title, description, category, deadline, status) VALUES (?, ?, ?, ?, ?, ?)", [userId, title, description, category, deadline, status]);
    console.log(result);
    return result.insertId;
};

// Update task
export const updateTask = async (data) => {
    const { id, title, description, category, deadline, status } = data;

    const updates = [];
    const values = [];

    if (title !== undefined) {
        updates.push("title = ?");
        values.push(title);
    }
    if (description !== undefined) {
        updates.push("description = ?");
        values.push(description);
    }
    if (category !== undefined) {
        updates.push("category = ?");
        values.push(category);
    }
    if (deadline !== undefined) {
        updates.push("deadline = ?");
        values.push(deadline);
    }
    if (status !== undefined) {
        updates.push("status = ?");
        values.push(status);
    }

    if (updates.length === 0) {
        return { ok: false, reason: "NO_FIELDS" };
    }

    values.push(id); // add id to values

    const [result] = await pool.query(
        `UPDATE tasks
         SET ${updates.join(", ")}
         WHERE id = ?`,
         values
    );

    console.log(result);

    if (result.affectedRows === 0) {
        return { ok: false, reason: "NOT_FOUND" };
    }

    return { ok: true, reason: null };
};