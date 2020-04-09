import express from 'express'
import history from 'connect-history-api-fallback'

import { login } from './src/login.js'

import dotenv from 'dotenv'

dotenv.config()

var app = express()

app.use('/api/login', (req, res) => {
    res.send('ok')
})

app.use(history({
    verbose: true
}));
app.use('/', express.static("../client/dist"))

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})