import { pool } from "../db.config.js";

export const addMission = async ({ store_id, point, deadline, mission_detail }) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO mission (store_id, point, deadline, mission_detail, create_at, update_at) 
       VALUES (?, ?, ?, ?, NOW(6), NOW(6))`,
      [store_id, point, deadline, mission_detail]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`미션 추가 중 오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};

export const findMissionById = async (mission_id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT m.*, o.number AS owner_number
       FROM mission m
       JOIN owner o ON m.store_id = o.store_id
       WHERE m.id = ?`,
      [mission_id]
    );
    return rows[0];
  } finally {
    conn.release();
  }
};

export const findUserMission = async ({ mission_id, user_id }) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM user_mission WHERE mission_id = ? AND user_id = ?`,
      [mission_id, user_id]
    );
    return rows.length > 0 ? rows[0] : null;
  } finally {
    conn.release();
  }
};

export const addUserMission = async ({ mission_id, user_id, store_id, owner_number, status }) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO user_mission (mission_id, user_id, store_id, owner_number, status, create_at, update_at)
       VALUES (?, ?, ?, ?, ?, NOW(6), NOW(6))`,
      [mission_id, user_id, store_id, owner_number, status]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};