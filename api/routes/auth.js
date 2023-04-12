import express from "express";
const router = express.Router();
import { deleteToken, issueRefreshToken, login } from "../controllers/token";
import authenticate from "../middleware/authenticate";

router.post('/login', (req, res) => {

    const { email, password } = req.body;
    return login({ email, password })
        .then((data) => res.json(data))
        .catch((err) => res.status(400).send({ err }))
})

router.post('/refresh', authenticate, (req, res) => {

    return issueRefreshToken({ refresh_token: req.refresh_token, user: req.user })
        .then((data) => res.json(data))
        .catch(err => res.json({ err }))
})

router.post("/logout", authenticate, async (req, res) => {
    return deleteToken(req.user)
        .then((data) => res.json(data))
        .catch(err => res.json({ err }))
});

export default router;