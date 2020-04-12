import google from 'googleapis'
import jwt from 'jsonwebtoken'

import { pool } from './initdb.js'

const JWT_EXP_DAYS = 30

const oa2client = new google.google.auth.OAuth2(
    process.env.G_CLIENT_ID,
    process.env.G_CLIENT_SECRET,
    process.env.G_CLIENT_REDIRECT_URI
)

const userQuery = `
select id, first_name, last_name, email from identity.user where email = $1
`

const userInsert = `
insert into identity.user(first_name, last_name, email)
VALUES ($1, $2, $3)
on conflict(email) do nothing
returning id, first_name, last_name, email;
`

const createUser = async (firstName, lastName, email) => {
    const response = await pool.query(userInsert, [firstName, lastName, email])
    return response
}

const getUser = async (email) => {
    const response = await pool.query(userQuery, [email])
    return response
}

const login = async (authCode) => {
    const { tokens } = await oa2client.getToken(authCode).catch(err => {
        console.log(err)
        throw "error getting oauth2 access token"
    })
    const id = jwt.decode(tokens.id_token)
    var user = await getUser(id.email)

    if (!user.rowCount) {
        user = await createUser(id.given_name, id.family_name, id.email)
        if (!user.rowCount) {
            throw "error creating user"
        }
    }

    const userToken = jwt.sign(user.rows[0], process.env.JWT_SECRET, {
        expiresIn: (JWT_EXP_DAYS * 24 * 60 * 60)
    })

    return userToken
}

const verify = (userToken) => {
    try {
        const result = jwt.verify(userToken, process.env.JWT_SECRET)
        return result
    } catch (error) {
        return false
    }
}

export {
    login,
    verify
}