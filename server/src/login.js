import google from 'googleapis'
import jwt from 'jsonwebtoken'

import { pool } from './initdb.js'

const oa2client = new google.google.auth.OAuth2(
    process.env.G_CLIENT_ID,
    process.env.G_CLIENT_SECRET,
    process.env.G_CLIENT_REDIRECT_URI
)

const userInsert = `
insert into identity.user(first_name, last_name, email)
VALUES ($1, $2, $3)
on conflict(email) do nothing;
`

const login = async (authCode) => {
    const { tokens } = await oa2client.getToken(authCode).catch(err => {
        console.log(err)
        return false
    })
    const id = jwt.decode(tokens.id_token)
    const response = await pool.query(userInsert, [id.given_name, id.family_name, id.email])
    return true
}

export {
    login
}