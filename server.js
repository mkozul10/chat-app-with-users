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

config();

const app = express();
const server = createServer(app);
const io = new Server(server);



export const __dirname = dirname(fileURLToPath(import.meta.url));

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

app.use(routes);


io.on('connection', socket => {
    socket.on("hello", ({user}) => {
        console.log(user);
    })
})


connectDB()
    .then(() => {
        server.listen(process.env.PORT || 3000, () => console.log('Listening for requests on port 3000'));
    })
    .catch(err => console.log('Error on connection',err));