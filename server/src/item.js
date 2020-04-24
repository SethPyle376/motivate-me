import { pool } from './initdb.js'

const getItems = async (userId, boardId) => {
  const { rows } = await pool.query('select * from content.link where user_id = $1 and board_id = $2', [userId, boardId])
  return rows
}

export {
  getItems
}