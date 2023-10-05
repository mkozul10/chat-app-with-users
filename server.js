import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB,connection } from './config/database.js';
import { User } from './models/users.js';

config();

const app = express();
const server = createServer(app);
const io = new Server(server);



const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static('public'));

app.get('/', async (req,res) => {
    const filePath = __dirname + '/public/sign-up.html';
    res.sendFile(filePath);
})

app.get('/log-in', (req,res) => {
    const filePath = __dirname + '/public/log-in.html';
    res.sendFile(filePath);
})


io.on('connection', middleware, stream => {
    console.log('Someone connected');
})


function middleware(s) {
    console.log(s);
}

connectDB()
    .then(() => {
        console.log(connection);
        server.listen(process.env.PORT || 3000, () => console.log('Listening for requests on port 3000'));
    })
    .catch(err => console.log('Error on connection',err));