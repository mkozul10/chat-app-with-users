import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB,connection } from './config/database.js';
import cors from 'cors';

config();

const app = express();
const server = createServer(app);
const io = new Server(server);



const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', async (req,res) => {
    const filePath = __dirname + '/public/sign-up.html';
    res.sendFile(filePath);
})

app.get('/log-in', (req,res) => {
    const filePath = __dirname + '/public/log-in.html';
    res.sendFile(filePath);
})

app.post('/sign-up', (req,res) => {
    console.log(req.body);
    res.json({bla: true});
})


io.on('connection', stream => {
    console.log('Someone connected');
})


connectDB()
    .then(() => {
        server.listen(process.env.PORT || 3000, () => console.log('Listening for requests on port 3000'));
    })
    .catch(err => console.log('Error on connection',err));