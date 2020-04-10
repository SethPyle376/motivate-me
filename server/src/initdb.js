import pg from 'pg'

const pool = new pg.Pool()

pool.on('connect', client => {
    console.log("connected")
})

pool.on('error', (err, client) => {
    console.error("db error: " + err)
})

const getPool = () => {
    return pool
}

export {
    getPool
}