const cookieSession = require("express-session");

// const warnings = require('../constants/warnings');

const serverSessionSecret = () => {
    if (
        !process.env.SERVER_SESSION_SECRET
        || process.env.SERVER_SESSION_SECRET.length < 8
    ) {
        throw new Error("Fatal error: No valid server secret found.");
    }

    return process.env.SERVER_SESSION_SECRET;
};

module.exports = cookieSession({
    secret: serverSessionSecret(),
    key: "user",
    resave: "false",
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 24 * 7, // Set to 7 days - 1000ms * 60 seconds * 60 minutes * 24 hours * 7 days
    secure: false,
});
