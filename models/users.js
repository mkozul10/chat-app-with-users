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
    },
    privateKey: {
        type: String,
        required: true
    },
    publicKey: {
        type: String,
        required: true
    },
    chats:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'Chat'}
    ]
})

export const User = mongoose.model('User', userSchema);