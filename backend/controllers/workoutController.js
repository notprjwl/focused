const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  const workouts = await Workout.find({user_id}).sort({ createdAt: -1 }); // it finds all the workout and sorts it in ascending order by createdAt timestamp
  res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  //checking if it is a valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "no such workout" }); // here you need to specify return or else it will fire the next code
  }
  res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
  const { title, weight, sets, reps } = req.body;
  let emptyFields = []; // handling the error responses
  if (!title) {
    emptyFields.push("title");
  }
  if (!weight) {
    emptyFields.push("weight");
  }
  if (!sets) {
    emptyFields.push("sets");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields!", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, weight, sets, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(400).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, weight, sets, reps } = req.body;
  let emptyFields = []; // handling the error responses
  if (!title) {
    emptyFields.push("title");
  }
  if (!weight) {
    emptyFields.push("weight");
  }
  if (!sets) {
    emptyFields.push("sets");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields!", emptyFields });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true }); // The spread operator (...) is used to spread the properties of res.body into the object being passed as the update. This means that the properties of res.body will be merged into the update operation. ie like title, weight, reps
  if (!workout) {
    return res.status(400).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
