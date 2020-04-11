import { pool } from './initdb.js'

const getBoard = async (user_id, boardName) => {
    const { rows } = await pool.query('SELECT * FROM content.board WHERE user_id = $1 AND name = $2', [user_id, boardName])
    console.log(rows)
    return rows
}

export {
    getBoard
}