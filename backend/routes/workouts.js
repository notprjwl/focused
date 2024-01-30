const express = require("express")
const router = express.Router() //  the express.Router() function creates a new router object. A router in Express is a way to organize routes and their handlers in a separate module. 
const Workout = require("../models/workoutModel")
// GET all workouts
router.get('/', (req, res) => {
    res.json({mesg:"GET all workouts"})
})

// GET a single workouts
router.get('/:id', (req, res) => {  // ': colen' represents route parameter. next to it can change
    res.json({mesg:"GET a single workout"})
})

// POST a single workouts
router.post('/', async (req, res)=> {
    const {title, weight, reps} = req.body  // This is the property that holds the parsed request body. When a client sends data in the body of an HTTP request (for example, in a POST or PUT request), it needs to be parsed before it can be used. The body property is where this parsed data is stored.
    
    try{
        const workout = await Workout.create({title, weight, reps})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
})

// DELETE a workout
router.delete('/:id', (req, res)=> {
    res.json({mesg:"DELETE a workout"})
})

// UPDATE a workout
router.patch('/:id', (req, res)=> {
    res.json({mesg:"UPDATE a workout"})
})


module.exports = router; //export all the routes

