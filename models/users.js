import mongoose from 'mongoose';

const schema = mongoose.Schema;

const userSchema = new schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }, 
    salt: {
        type: String,
        required: true
    }
})

export const User = mongoose.model('User', userSchema);