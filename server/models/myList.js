const mongoose = require('./index');

const Schema = mongoose.Schema;

const MyListSchema = new Schema({
  createdBy: String,
  title: String,
  collaborators: [String],
  recipient: String,
  text: String,
  lastEdited: String,
});

const MyList = mongoose.model('MyList', MyListSchema);

module.exports = MyList;