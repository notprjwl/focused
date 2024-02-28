const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// create token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" }); // 3 parameters
};

const createRefreshToken = (_id) => {
  return jwt.sign({ _id }, process.env.REFRESH, { expiresIn: "10d" });
};

// login user
const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  let emptyFields = [];

  if (!username) {
    emptyFields.push("username");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the field!" });
  }

  try {
    const user = await User.login(username, email, password);

    //creating a token
    const token = createToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 10 * 24 * 60 * 60 * 1000 });

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  let emptyFields = [];

  if (!username) {
    emptyFields.push("username");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "All fields must be filled", emptyFields });
  }

  try {
    const user = await User.signup(username, email, password);

    //creating a token
    const token = createToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 10 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ email, token,  refreshToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
