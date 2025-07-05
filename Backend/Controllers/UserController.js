import { generateToken } from "../jwt";
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

        const user = await UserSchema.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email',
                success: false
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserSchema.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        const token = generateToken({
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            role: newUser.role
        })

        if (newUser) {
            res.status(201).json({
                message: 'User registered successfully',
                success: true,
                token: token
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

        let user = await UserSchema.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Incorrect email or password',
                success: false
            });
        };

        const isPasswordMatch = await bcrypt.compareSync(password, user.password);
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

        const token = generateToken({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role
        })

        // res.status(200).json({
        //     message: 'User logged in successfully',
        //     success: true,
        //     token: token
        // })

        user = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
        }).json({
            message: `Welcome Back, ${user.fullName}`,
            success: true,
            token: token
        });

    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}