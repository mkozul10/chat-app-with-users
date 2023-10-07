import { User } from '../models/users.js';

export const checkUsername = async (req,res,next) => {
    try{
        const user = await User.findOne({username: req.body.username})
        if(user) res.json({err: true, msg: `Username ${req.body.username} already exists`});
        else next();
    } catch(err){
        console.log('Something went wrong in checking for username: ',err);
    }
}

export const checkEmail = async (req,res,next) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if(user) res.json({err: true, msg: `Email ${req.body.email} already exists`});
        else next();
    } catch(err){
        console.log('Something went wrong in checking for email: ',err);
    }
}

export const checkPassword = (req,res,next) => {
    if(req.body.password1.length < 8) res.json({err: true, msg: 'Password length needs to be at least 8 charachters'});
    if(req.body.password1 !== req.body.password2) res.json({err: true, msg: 'Passwords don\'t match'});
    else next();
}