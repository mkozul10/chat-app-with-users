import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models/users.js';
import { validatePassword } from '../lib/passwordUtils.js';

const verifyCallback = async (username, password, cb) => {
    try{

        const user = await User.findOne({username});

        if(!user) return cb(null, false);
        const isValidated = validatePassword(password, user.hash, user.salt);

        if(isValidated) return cb(null, user);
        else return cb(null, false)

    } catch(err) {
        cb(err);
    }
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
})

passport.deserializeUser( async (userId, cb) => {
    try{
        const user = await User.findById(userId);
        cb(null, user);
    } catch(err) {
        cb(err);
    }
})
