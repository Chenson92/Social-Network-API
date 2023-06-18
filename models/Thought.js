const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const reactionSchema = require("./ReactionSchema");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("thought", thoughtSchema);

module.exports = Thought;
