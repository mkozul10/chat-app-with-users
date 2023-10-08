import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB,connection } from './config/database.js';
import cors from 'cors';
import { checkEmail, checkUsername, checkPassword } from './middleware/serverMiddleware.js';
import { User } from './models/users.js';
import { generatePassword } from './lib/passwordUtils.js';
import { generateKeys } from './lib/keys.js';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import session from 'express-session';

config();

const app = express();
const server = createServer(app);
const io = new Server(server);



const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//session setup
const mongoStore = MongoStore.create({
    mongoUrl: process.env.DB_STRING,
    collectionName: 'sessions',
    mongooseConnection: connection
})

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//END session setup

//passport auth
import './config/passport.js';
app.use(passport.initialize());
app.use(passport.session())
//END passport auth

app.get('/', async (req,res) => {
    const filePath = __dirname + '/public/sign-up.html';
    res.sendFile(filePath);
})

app.get('/log-in', (req,res) => {
    const filePath = __dirname + '/public/log-in.html';
    res.sendFile(filePath);
})

app.post('/sign-up', checkUsername, checkEmail, checkPassword, async (req,res) => {
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
})

app.post('/log-in', passport.authenticate('local'), (req,res) => {
    res.json({err: false, msg:'Successfully logged in',username: req.user.username});
})


io.on('connection', stream => {
    console.log('Someone connected');
})


connectDB()
    .then(() => {
        server.listen(process.env.PORT || 3000, () => console.log('Listening for requests on port 3000'));
    })
    .catch(err => console.log('Error on connection',err));