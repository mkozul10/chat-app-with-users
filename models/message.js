import mongoose from 'mongoose';

const schema = new mongoose.Schema;

const messageSchema = new schema({
    text: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    sentFrom: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    sentTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

}, {timestamps: true});

export const Message = mongoose.model('Message', messageSchema);