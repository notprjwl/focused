const mongoose = require("mongoose"); //importing mongoose library

const Schema = mongoose.Schema; //creates a variable named Schema and assigns it the Schema property of the mongoose object

const workoutSchema = new Schema(
  {
    //new schema called workoutSchema
    title: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
); //this automatically adds created fields

module.exports = mongoose.model("workout", workoutSchema); //this exports the mongoose model based on the workoutSchema
