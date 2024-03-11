import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;
import encryptLib from "../middleware/encryption";
import { client } from "../db/db";

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await client.db("mood-music").collection("users").findOne({ _id: id });

    if (user) {
        // user found
        delete user.password; // remove password so it doesn't get sent
        // done takes an error (null in this case) and a user
        done(null, user);
    } else {
        // user not found
        // done takes an error (null in this case) and a user (also null in this case)
        // this will result in the server returning a 401 status code
        done(null, null);
    }
    // })
    // .catch((error) => {
    //   console.log('Error with query during deserializing user ', error);
    //   // done takes an error (we have one) and a user (null in this case)
    //   // this will result in the server returning a 500 status code
    //   done(error, null);
    // });
});

passport.use(
    "local",
    new LocalStrategy(async (username, password, done) => {
        const user = await client.db("mood-music").collection("users").findOne({ username: username });

        console.log("CHECKING USER: ", username, password);
        // const user = result && result.rows && result.rows[0];
        if (user && encryptLib.comparePassword(password, user.password)) {
            console.log("SUCCESS");
            // All good! Passwords match!
            // done takes an error (null in this case) and a user
            done(null, user);
        } else {
            // Not good! Username and password do not match.
            // done takes an error (null in this case) and a user (also null in this case)
            // this will result in the server returning a 401 status code
            done(null, null);
        }
    }),
);

export default passport;
