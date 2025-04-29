import generateToken from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import validator from "validator"

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    
    if (!fullName || !email || !password ) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    //Email validation
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "You have entered wrong email id" });
    }
    
    //Password validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // Generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(`Error in signup controller, ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const login = (req, res) => {
  res.send("Signup route");
};
const logout = (req, res) => {
  res.send("Signup route");
};

export { signup, login, logout };
