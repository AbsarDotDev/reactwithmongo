const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
       
    },
    tag: {
        type: String,
        required: true,
        default : "general"
    }
});
const Notes=mongoose.model('notes',NotesSchema);
Notes.createIndexes();
module.exports=Notes