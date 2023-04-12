import express from "express";
import { ObjectId } from "mongodb";
import { getUser } from "../controllers/user";
const router = express.Router();

import authenticate from "../middleware/authenticate";

router.get('/', authenticate, async (req, res) => {
    let user;
    try {
        user = new ObjectId(req.user)
    } catch (error) {
        return res.status(404).send({ err: 'Invalid user ID.' })
    }

    const { data, err } = await getUser({ _id: user })

    if (err) return res.status(404).send({ err })

    return res.json({ user: data })
})

export default router;