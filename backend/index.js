require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const cors = require('cors');

// express app
const app = express();

app.use(cors());


// middleware
app.use(express.json()); //This is particularly useful for handling POST or PUT requests where the client sends JSON data in the request body. The express.json() middleware ensures that you can easily access and work with that JSON data in your route handlers ie workoutRoutes
app.use((req, res, next) => {
  //app.use -> expressjs method used to mount middleware func in the req, res cycle. It specifies that the middleware function provided should be executed for every incoming request.
  console.log(req.path, req.method);
  next(); //the next function passes the control to the next middleware in the stack. if you dont call next the req, res will be halted at this middleware and next ones wont be excecuted
});


// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes)

// connect to db
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log("connected to the db and listening on port", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });


