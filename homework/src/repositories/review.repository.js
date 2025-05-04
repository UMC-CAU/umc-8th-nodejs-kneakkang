import { pool } from "../db.config.js";

export const addReview = async ({ store_id, user_id, name, content, image, star }) => {
    const conn = await pool.getConnection();
  
    try {
      const [result] = await conn.query(
        `INSERT INTO review (store_id, user_id, name, content, image, star, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?, NOW(6), NOW(6));`,
        [store_id, user_id, name, content, image, star]
      );
      return result.insertId;
    } catch (err) {
      throw new Error(`리뷰 추가 중 오류 발생: ${err}`);
    } finally {
      conn.release();
    }
  };
  