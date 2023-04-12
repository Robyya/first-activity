import Token from "../../models/model.token";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Database from "./../services/service.database";
import { userCollection } from "./user";

const {
    SECRET_KEY = "----@SECRET-KEY!----"
} = process.env;

export function generateAccessToken(payload = { user = '' } = {}) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
}

export function tokenCollection() {
    return Database.instance().collection('tokens')
}

export function login({ email = "", password = "" }) {

    return userCollection().findOne({ email })
        .then(user => {
            if (!user) return Promise.reject('Invalid, account does not exist in the system.')
            return bcrypt.compare(password, user.password)
                .then((same) => {
                    if (!same) return Promise.reject('Password did not match, please try again.')

                    const tokenPayload = { user: user._id }
                    const refresh_token = jwt.sign(tokenPayload, SECRET_KEY);
                    const access_token = generateAccessToken(tokenPayload);

                    return tokenCollection()
                        .insertOne(new Token({ user: user._id, access_token, refresh_token }))
                        .then(() => ({ access_token, refresh_token }))
                        .catch((err) => err);
                })
                .catch((err) => Promise.reject(err))
        })
        .catch((err) => Promise.reject(err));
}

export function issueRefreshToken({ refresh_token = "", user = "" }) {
    return tokenCollection().findOne({ refresh_token })
        .then(token => {
            if (token) Promise.reject('Failed to issue refresh token, invalid token.');
            const access_token = generateAccessToken({ user });
            return { access_token }
        })
        .catch(() => Promise.reject('Failed to issue refresh token.'))
}

export function deleteToken(user = "") {
    return tokenCollection()
        .deleteMany({ user })
        .then(() => "Successfully logged out.")
        .catch(() => Promise.reject('Failed to logout.'))
}