import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB,connection } from './config/database.js';
import cors from 'cors';
import { User } from './models/users.js';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import session from 'express-session';
import routes from './routes/sign-log-in-route.js';
import passportSocketio from 'passport.socketio';
import cookieParser from 'cookie-parser';

config();

const app = express();
const server = createServer(app);
const io = new Server(server);

export const __dirname = dirname(fileURLToPath(import.meta.url));

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());
//END middleware

//session setup
const mongoStore = MongoStore.create({
    mongoUrl: process.env.DB_STRING,
    collectionName: 'sessions',
    mongooseConnection: connection
})

const sessionMiddleware = session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
})

app.use(sessionMiddleware);

//END session setup

//passport auth
import './config/passport.js';
app.use(passport.initialize());
app.use(passport.session())
//END passport auth

app.use(routes);

// io session setup
const onAuthorizeSuccess = (data, accept) => {
    accept();
}

const onAuthorizeFail = (data, message, error, accept) => {
    if (error) throw new Error(message);
    console.log('Failed connection to socket.io:', message);
    accept(new Error(message));
}
  
io.use(passportSocketio.authorize({
    key:'connect.sid',
    secret: process.env.SECRET,
    store: mongoStore,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
}))
//END io session setup

//socket implementation
io.on('connection', socket => {
    console.log(socket.request.user);
})
//END socket implementation


connectDB()
    .then(() => {
        server.listen(process.env.PORT || 3000, () => console.log('Listening for requests on port 3000'));
    })
    .catch(err => console.log('Error on connection',err));