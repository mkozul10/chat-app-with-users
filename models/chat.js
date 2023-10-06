import mongoose, { Schema } from 'mongoose';

const schema = mongoose.Schema;

const chatSchema = new Schema({
    messages:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'Message'}
    ],
    salt: {
        type: String,
        required: true
    },
    chatOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    chatWith: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

export const Chat = mongoose.model('Chat', chatSchema);