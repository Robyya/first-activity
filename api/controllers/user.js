import UserModel from "../../models/model.user"
import Database from "../services/service.database"
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export function userCollection() {
    return Database.instance().collection('users')
}

export function createUser({ user = new UserModel(), profile = {} }) {
    const session = Database.client().startSession();
    const transactionOptions = {
        readPreference: "primary",
        readConcern: { level: "local" },
        writeConcern: { w: "majority" },
    };

    return session.withTransaction(async () => {
        delete user._id;
        const password = user.password || String(new ObjectId())

        const exist = await userCollection().countDocuments({ email: user.email })

        if (exist) return Promise.reject('Invalid, someone is already using that email.')

        user.password = await bcrypt.hash(password, 10)
            .catch(err => {
                console.log(err);
                return Promise.reject(err)
            })

        await userCollection()
            .insertOne(user, { session })
            .catch(() => Promise.reject('Failed to create user.'))

    }, transactionOptions)
        .then(() => {
            session.endSession();
            return 'Congratulation! Please check your email, we sent you a verification containing your temporary password.'
        })
        .catch(err => {
            session.endSession();
            return Promise.reject(err)
        })


}


export function updateUser({ user = new UserModel(), attachments = [], profile = {} }) {
    const session = Database.client().startSession();
    const transactionOptions = {
        readPreference: "primary",
        readConcern: { level: "local" },
        writeConcern: { w: "majority" },
    };

    return session.withTransaction(async () => {

        let _id = user._id;
        delete user._id;

        try {
            _id = new ObjectId(_id)
        } catch (error) {
            return Promise.reject('Invalid ID.')
        }

        const exist = await userCollection().countDocuments({ _id: { $ne: _id }, email: user.email })

        if (exist) return Promise.reject('Invalid, someone is already using that email.')

        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10)
                .catch(err => {
                    console.log(err);
                    return Promise.reject(err)
                })
        }

        await userCollection()
            .updateOne({ _id }, { $set: user }, { session })
            .catch(() => Promise.reject('Failed to update user.'))

    }, transactionOptions)
        .then(() => {
            session.endSession();
            return 'Successfully updated user.'
        })
        .catch(err => {
            session.endSession();
            return Promise.reject(err)
        })
}

export function getUser(payload = {}) {
    return userCollection()
        .findOne(payload)
        .then(data => {
            delete data.password
            return { data: data || {} }
        })
        .catch(err => ({ err }))
}