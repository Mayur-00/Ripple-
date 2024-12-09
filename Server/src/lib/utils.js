import jwt from "jsonwebtoken";

export const generateTokens = async (userid, res) => {
  const token =  jwt.sign({userid}, process.env.JWT_KEY);

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development",
    });

    return token;


}