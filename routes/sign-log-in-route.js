import { Router } from 'express';
import passport from 'passport';
import { __dirname } from '../server.js';
import { checkEmail, checkUsername, checkPassword } from '../middleware/serverMiddleware.js';
import {    
    getSignUp,
    getLogIn,
    postSignUp,
    postLogIn,
    getLogOut,
    getChat
} from '../controllers/sign-log-in-controller.js';

const router = Router();

router.get('/', getSignUp);

router.get('/log-in', getLogIn);

router.post('/sign-up', checkUsername, checkEmail, checkPassword, postSignUp);

router.post('/log-in', passport.authenticate('local'), postLogIn);

router.get('/log-out', getLogOut);

router.get('/chat', getChat);

export default router;