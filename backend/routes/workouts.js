const express = require("express")
const router = express.Router() //  the express.Router() function creates a new router object. A router in Express is a way to organize routes and their handlers in a separate module. 

// GET all workouts
router.get('/', (req, res) => {
    res.json({mesg:"GET all workouts"})
})

// GET a single workouts
router.get('/:id', (req, res) => {  // ': colen' represents route parameter. next to it can change
    res.json({mesg:"GET a single workout"})
})

// POST a single workouts
router.post('/', (req, res)=> {
    res.json({mesg:"POST a single workout"})
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