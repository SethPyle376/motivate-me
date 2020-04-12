import express from 'express'
import history from 'connect-history-api-fallback'
import { getBoard, getBoards } from './src/board.js'
import { login } from './src/login.js'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()

var app = express()

app.use(bodyParser.json())

app.post('/api/login', async (req, res) => {
    console.log(req.body.authCode)
    const loginResult = await login(req.body.authCode).catch((err) => {
        res.sendStatus(500)
    })
    res.send({
        token: loginResult
    })
})

app.get('/api/boards/:userId', async(req, res) => {
    const rows = await getBoards(req.params.userId)
    res.send(rows)
})

app.get('/api/board/:clientId/:boardName', async (req, res) => {
    const rows = await getBoard(req.params.clientId, req.params.boardName)
    res.send(rows)
})

app.use(history({
    verbose: true
}));

app.use('/', express.static("../client/dist"))

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})