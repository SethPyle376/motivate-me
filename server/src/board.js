import { pool } from './initdb.js'

const getBoard = async (user_id, boardName) => {
    const { rows } = await pool.query('SELECT * FROM content.board WHERE user_id = $1 AND id = $2', [user_id, boardName])
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