const { generateToken } = require("../middleware/jwt");
const User = require("../models/User");
const bcrypt = require('bcrypt');

exports.userRegister = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.create({ name, email, password, role });

        const token = generateToken(user);

        if (token) {
            return res.status(200).json({ message: "User registered successfully", token, user });
        } else {
            return res.status(400).json({ message: "User registration failed" });
        }

    } catch (error) {
        console.log("Error while registering  user", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken(user);

        if (token) {
            return res.status(200).json({ message: "User logged in successfully", token, user });
        } else {
            return res.status(400).json({ message: "User login failed" });
        }

    } catch (error) {
        console.log("Error while logging in user", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}