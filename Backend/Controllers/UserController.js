import UserSchema from "../Models/UserSchema";
const bcrypt = require('bcrypt');

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        };

        const user = await UserSchema.fineOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email',
                success: false
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserSchema({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        if (newUser) {
            res.status(201).json({
                message: 'User registered successfully',
                success: true
            })
        } else {
            res.status(400).json({
                message: 'User registration failed',
                success: false
            })
        }
    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        };

        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Incorrect email or password',
                success: false
            });
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: 'Incorrect email or password',
                success: false
            });
        };

        // check if user role
        if (role !== user.role) {
            return res.status(400).json({
                message: 'Account does not exist with this role',
                success: false
            });
        };

        // const token = {}

        res.status(200).json({
            message: 'User logged in successfully',
            success: true
        })
    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}