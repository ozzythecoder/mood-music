import cookie_Session from "express-session";

const getServerSessionSecret = () => {
    const secret = process.env.SERVER_SESSION_SECRET;
    if (!secret || secret.length < 8) {
        throw new Error("Fatal error: No valid server secret found.");
    }
    return secret;
};

export const cookieSession = cookie_Session({
    secret: getServerSessionSecret(),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV !== "development", // If "true", sends HTTPS requests that don't work with postman
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
});
