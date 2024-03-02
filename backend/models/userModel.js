const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 10,
    validate: {
      validator: function (value) {
        // Custom validation using a regular expression
        return /^[a-zA-Z0-9]+$/.test(value);
      },
      message: "must only contain alphanumeric characters.",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method for usermodel //signup fucntion is created here. you can use it anywhere just call the function.
userSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const emailExists = await this.findOne({ email }); //we can use User instead of this but it is going to export at the end. that is why we are using this to access userModel
  const usernameExists = await this.findOne({ username });

  if (usernameExists) {
    throw Error("username already in use");
  }

  if (emailExists) {
    throw Error("email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (usernameOrEmail, password) {
  // if ((!!email && !!username) || (!email && !username)) {
  //   throw Error("Provide either username or email");
  // }
  if (!usernameOrEmail) {
    throw Error("Please provide either username or email");
  }

  if (!password) {
    throw Error("Password is required");
  }

  const isEmail = validator.isEmail(usernameOrEmail);
  const user = await this.findOne(isEmail ? { email: usernameOrEmail } : { username: usernameOrEmail });

  if (!user) {
    throw Error("Invalid login credentials");
  }

  const match = await bcrypt.compare(password, user.password); // comparing password and hashed password

  if (!match) {
    throw Error("Invalid Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
