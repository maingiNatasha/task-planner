import pool from "../db/pool.js";

// Create a token to be used for password reset
export const createPasswordReset = async (userId, tokenHash, expiresAt) => {
    const [result] = await pool.query(
        `INSERT INTO password_resets (user_id, token_hash, expires_at)
         VALUES (?, ?, ?)`,
        [userId, tokenHash, expiresAt]
    );

    return result.insertId;
};

// Find valid reset by the hashed token
export const findValidResetByTokenHash = async (tokenHash) => {
    const [rows] = await pool.query(
        `SELECT id, user_id, expires_at, used_at
         FROM password_resets
         WHERE token_hash = ?
           AND used_at IS NULL
           AND expires_at > NOW()
         LIMIT 1`,
        [tokenHash]
    );

    return rows[0] || null;
};

// Mark password reset token as used
export const markResetUsed = async (resetId) => {
    const [result] = await pool.query(
        `UPDATE password_resets
         SET used_at = NOW()
         WHERE id = ? AND used_at IS NULL`,
        [resetId]
    );

    return result.affectedRows > 0;
};


// Invalidate older tokens for the same user
export const invalidateAllResetsForUser = async (userId) => {
    await pool.query(
        `UPDATE password_resets
         SET used_at = NOW()
         WHERE user_id = ? AND used_at IS NULL`,
        [userId]
    );
};