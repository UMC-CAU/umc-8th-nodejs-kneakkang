import { pool } from "../db.config.js";

export const findOwnerByNumber = async (number) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM owner WHERE number = ?`, [number]);
    return rows.length > 0 ? rows[0] : null;
  } finally {
    conn.release();
  }
};


// store_id로 owner_number를 조회하는 함수
export const findOwnerNumberByStoreId = async (store_id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT number FROM owner WHERE store_id = ?`, [store_id]);
    return rows.length > 0 ? rows[0].number : null;
  } finally {
    conn.release();
  }
};

export const findOwnerByStoreId = async (store_id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM owner WHERE store_id = ?`, [store_id]);
    return rows.length > 0 ? rows[0] : null;
  } finally {
    conn.release();
  }
};