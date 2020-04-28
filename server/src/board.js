import { pool } from './initdb.js'

const getBoard = async (userId, boardId) => {
    const { rows } = await pool.query('SELECT * FROM content.board WHERE user_id = $1 AND id = $2', [userId, boardId])
    return rows
}

const getBoards = async (userId) => {
    const { rows } = await pool.query('select * from content.board where user_id = $1', [userId])
    return rows
}

export {
    getBoard,
    getBoards
}