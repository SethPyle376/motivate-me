import express from 'express'
import history from 'connect-history-api-fallback'
import { getBoard } from './src/board.js'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()

var app = express()

app.use(bodyParser.json())

app.post('/api/login', (req, res) => {
    console.log(req.body.authCode)
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