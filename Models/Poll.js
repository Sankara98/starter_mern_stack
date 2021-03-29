const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollSchema = new Schema({
  title: {
    type: String,
  },

  pollOptions: [{
      type: Schema.Types.ObjectId, ref: 'pollItem'
  }],
});

module.exports = Poll = mongoose.model("poll", PollSchema);