import express from 'express'
import history from 'connect-history-api-fallback'
import { login } from './src/login.js'
import { getPool } from './src/initdb.js'
import dotenv from 'dotenv'
dotenv.config()

const pool = getPool()

var app = express()

app.use('/api/login', (req, res) => {
    pool.connect((err, client, done) => {
        client.query('SELECT * FROM identity.users where id = $1;', [1], (err, res) => {
            if (err) {
                console.error(err)
            }
            console.log(res)
        })
    })
    res.send('ok')
})

app.use(history({
    verbose: true
}));

app.use('/', express.static("../client/dist"))

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})