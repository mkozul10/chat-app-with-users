import { __dirname } from '../server.js';
import { User } from '../models/users.js';
import { generatePassword } from '../lib/passwordUtils.js';
import { generateKeys } from '../lib/keys.js';


export const getSignUp = (req,res) => {
    const filePath = __dirname + '/public/sign-up.html';
    res.sendFile(filePath);
}

export const getLogIn = (req,res) => {
    const filePath = __dirname + '/public/log-in.html';
    res.sendFile(filePath);
}

export const postSignUp = async (req,res) => {
    const password = generatePassword(req.body.password1);
    const keys = generateKeys();
    try{
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            hash: password.hash,
            salt: password.salt,
            privateKey: keys.privateKey,
            publicKey: keys.publicKey
        })
        const created = await newUser.save();
        res.json({err: false, msg:'User successfully created'});
       
    } catch(err){
        console.log(err);
    }
}

export const postLogIn = (req,res) => {
    if(req.user) res.json({err: false, msg:'Successfully logged in',username: req.user.username});
    else res.json({err: false, msg:'Successfully logged in',username: req.user.username});
}

export const getLogOut = (req,res) => {
    if(req.isAuthenticated()){
        req.logout(err => {
            if(err) console.log(err);
        });
        res.json({redirect:'/'});
    }
    else res.redirect('/');
}

export const getChat = (req,res) => {
    if(req.isAuthenticated()){
        const filePath = __dirname + '/public/chat.html';
        res.sendFile(filePath);
    }
    else res.redirect('/');
}