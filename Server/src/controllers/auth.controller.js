import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateTokens } from "../lib/utils.js";

export const signup = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        if (!userName || !email || !password) {
            return res.status(400).json({ Message: "all fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "password should be at least 6 charactors!" })
        };

        const existingUser = await User.findOne({ email, userName });
        const existingUser1 = await User.findOne({ userName });

        if (existingUser) {
            return res.status(400).json({ message: "user already exist please login" })
        };
        if (existingUser1) {
            return res.status(400).json({ message: "userName already taken please change the username" });
        };

        const salt = await bcrypt.genSalt(10);

        const hashedpass = await bcrypt.hash(password, salt);

        const user = await new User({
            userName,
            email,
            password: hashedpass,
        },
        );

        // await user.save();

        if (user) {
            generateTokens(user._id, res)
            await user.save();

            res.status(201).json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                password: user.password
            });
        } else {
            res.status(400).json({ message: "invalid user credentials" })
        }
    } catch (error) {
        console.log("error in login controller", error);
        res.status(500).json({ message: "internal server error" })

    }


}

export const login = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ userName });

        if (!user) {
           return res.status(404).json({ message: "invalid User Credentials" });
        };

        const isPasswordIsCorrect = bcrypt.compare(password, user.password);

        if (!isPasswordIsCorrect) {
           return res.status(401).json({ message: "invalid User Credentials" });
            console.log("invalid User Credentials")
        };

        generateTokens(user._id, res);

        res.status(202).json({
            userName: user.userName,
            email: user.email,
            password: user.password
        },
        );

    } catch (error) {
        console.log(`error in login controller: ${error}`);
        res.status(500).json({ message: "internal server error" });

    };
};

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged Out Succesfully" });
    } catch (error) {
        console.log(`error in logout controller: ${error}`);
        return res.status(500).json({ message: "internal server error" });

    };
};

export const checkAuth = (req, res) => {
    try {   
        if(req.user){
            return res.status(200).json(req.user);
        }
        else{
            return res.status(500).json({message:"user not found"})
        }
    } catch (error) {
        console.log(`error in checAuth Function: ${error}`);
        return res.status(500).json({ message: "internal server error " });

    };
};


