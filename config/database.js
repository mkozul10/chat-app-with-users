import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch(err) {
        console.log('MongoDB connection error: ',err);
        process.exit(1);
    }
}

export const connection = mongoose.connection;
