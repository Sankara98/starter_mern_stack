const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollItemSchema = new Schema({
  description: {
    type: String,
  },
  count: {
    type: Number,
  },
  pollItem: {
    type: Schema.Types.ObjectId, ref: 'poll'
  }
});

module.exports = PollItem = mongoose.model("pollItem", PollItemSchema);
