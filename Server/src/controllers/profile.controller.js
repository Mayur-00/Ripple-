import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";


export const updateProfilePic = async (req, res) => {

    try {
        const userid = req.user._id;
        const { bio, profilePic } = req.body;

        if (!profilePic) {
            return res.status(400).json({ message: "profile picture required" })
        }

        
        const uploadResponse = await cloudinary.uploader.upload(profilepic);
        const updatedUser = await User.findByIdAndUpdate(userid, { profilePic: uploadResponse.secure_url }, { new: true });

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log(`error in updateProfilePic function: ${error}`);
        return res.status(500).json({ message: "internal server error" });

    };

};

export const updateBio = async (req, res) => {
    try {
        const userid = req.user._id;
        const { bio } = req.body;

        if (!bio) {
            return res.status(400).json({ message: "bio is required" });
        };

        const updatedUser = await User.findByIdAndUpdate(userid, { bio: bio }, { new: true });

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(`error in updateBio function: ${error}`);
        return res.status(500).json({ message: "internal server error" });
    };
};