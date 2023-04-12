import express from "express";
import rateLimit from "express-rate-limit";
const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.disable("x-powered-by");

// import routes
import auth from "./auth";
import user from "./user";
import scholarship from "./scholarship";
import applicant from "./applicant";

// use routes
app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/scholarship', scholarship)
app.use('/api/applicant', applicant)

module.exports = app