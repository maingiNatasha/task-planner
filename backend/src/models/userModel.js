import pool from "../db/pool.js"

// Get a user by email
export const getUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT id, email, password FROM users WHERE email = ?", [email]);
    return rows[0] || null;
};

// Get a user by id
export const getUserById = async(id) => {
    const [rows] = await pool.query("SELECT id, email FROM users WHERE id = ?", [id]);
    return rows[0] || null;
};

// Create a new user
export const createUser = async (email, hashedPassword) => {
    const [result] = await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
    return result.insertId;
};

// Update user password
export const updateUserPasswordById = async (userId, hashedPassword) => {
    const [result] = await pool.query(
        `UPDATE users
         SET password = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [hashedPassword, userId]
    );

    return result.affectedRows > 0;
}

// Get user profile
export const getUserProfile = async (id) => {
    const [rows] = await pool.query("SELECT * FROM user_profiles WHERE user_id = ?", [id]);
    return rows[0] || null;
};

// Insert and update user profile
export const saveUserProfile = async (userId, data) => {
    const { firstname, lastname, username } = data;

    const [result] = await pool.query(
        `INSERT INTO user_profiles (user_id, first_name, last_name, username)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           first_name = VALUES(first_name),
           last_name = VALUES(last_name),
           username = VALUES(username)`,
        [userId, firstname, lastname, username]
    );

    // Return the current profile
    return { userId, firstname, lastname, username };
};