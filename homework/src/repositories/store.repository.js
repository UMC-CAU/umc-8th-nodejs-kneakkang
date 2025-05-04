import { pool } from "../db.config.js";

export const findStoreById = async (store_id) => {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query(`SELECT * FROM store WHERE id = ?`, [store_id]);
      return rows.length > 0 ? rows[0] : null;
    } finally {
      conn.release();
    }
  };