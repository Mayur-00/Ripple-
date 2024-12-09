import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unautorized - not token provided !" });
        };

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "jwt not verified" });
        };

        const user = await User.findById(decoded.userid).select("-password");

        if (!user) {
            return res.status(404).json({ message: "user not found !" });
        };

        req.user = user

        next();

    } catch (error) {
        console.log(`error in auth middleware: ${error}`);

        return res.status(500).json({message:"internal server error"})
    }
}