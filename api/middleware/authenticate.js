import jwt from "jsonwebtoken";
const {
    SECRET_KEY = "----@SECRET-KEY!----"
} = process.env;

export default function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null) return res.status(401).send({ error: 'Unauthorized' });

    jwt.verify(token, SECRET_KEY, (err, { user }) => {
        if (err) return res.status(403).send({ error: 'Unauthorized' });
        req.user = user
        req.refresh_token = token
        next();
    });
}