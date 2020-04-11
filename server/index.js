import express from 'express'
import history from 'connect-history-api-fallback'
import { getBoard } from './src/board.js'
import dotenv from 'dotenv'
dotenv.config()

var app = express()

app.use('/api/board/:clientId/:boardName', async (req, res) => {
    if (req.method === "GET") {
        const rows = await getBoard(req.params.clientId, req.params.boardName)
        res.send(rows)
    }
})

app.use(history({
    verbose: true
}));

app.use('/', express.static("../client/dist"))

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})