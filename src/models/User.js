const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
});

module.exports = mongoose.model('NotesUser', UserSchema);
