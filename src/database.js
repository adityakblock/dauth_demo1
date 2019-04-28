const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://adigupta:adi.gupta13@dauthserver-qjt20.mongodb.net/test?retryWrites=true', {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));
