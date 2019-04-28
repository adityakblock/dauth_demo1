const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
});

module.exports = mongoose.model('NotesUser', UserSchema);
