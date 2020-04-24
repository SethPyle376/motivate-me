import express from 'express'
import history from 'connect-history-api-fallback'
import jwt from 'jsonwebtoken'
import { getBoard, getBoards } from './src/board.js'
import { getItems } from './src/item.js'
import { login } from './src/login.js'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()

var app = express()

app.use(bodyParser.json())

app.use('/api', (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization !== "") {
        try {
            const profile = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
            req.headers.verifiedProfile = profile
            next()
        } catch(error) {
            res.sendStatus(401)
        }
    } else {
        next()
    }
})

app.post('/api/login', async (req, res) => {
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

app.get('/api/board/:clientId/:boardId', async (req, res) => {
    const rows = await getItems(req.params.clientId, req.params.boardId)
    res.send(rows)
})

app.use(history({
    verbose: true
}));

app.use('/', express.static("../client/dist"))

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})