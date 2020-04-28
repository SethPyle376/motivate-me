import { pool } from './initdb.js'

const getItems = async (boardId) => {
  const { rows } = await pool.query('select * from content.link where board_id = $1', [boardId])
  return rows
}

const addItem = async (boardId, userId, link, description) => {
  const { rows } = await pool.query('insert into content.link(user_id, board_id, link, description) values ($1, $2, $3, $4);', [userId, boardId, link, description])
  return rows
}

export {
  getItems,
  addItem
}