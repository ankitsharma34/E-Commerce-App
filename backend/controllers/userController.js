import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist. Register user.",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const token = createToken(user._id);
      return res.json({
        success: true,
        token,
      });
    } else {
      return res.json({ success: false, message: "Incorrect id or password." });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Route for registerUser
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking user already existing or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists." });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email.",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password should be at least 8 character long",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating and storing new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    // creating JWT token
    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Unexpected error occurred!" });
  }
};

// Route for adminLogin
const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
