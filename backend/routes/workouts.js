const express = require("express");
const router = express.Router(); //  the express.Router() function creates a new router object. A router in Express is a way to organize routes and their handlers in a separate module.
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require("../controllers/workoutController");

// GET all workouts
router.get("/", getWorkouts);

// GET a single workouts
router.get("/:id", getWorkout);

// POST a single workouts
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router; //export all the routes
