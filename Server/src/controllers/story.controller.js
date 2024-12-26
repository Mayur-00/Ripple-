import cloudinary from "../lib/cloudinary.js";
import Story from "../models/story.model.js";
import User from "../models/user.model.js";


export const createStory = async (req, res) => {
    try {
        const existingUser = req.user._id;
        const { image, text } = req.body;
      const uploadResponse = await cloudinary.uploader.upload(image);
        
        const story = new Story({

            owner: existingUser,
            text: text,
            image:uploadResponse.secure_url
        });

        await story.save();

        res.status(200).json({ message: "story created succesfully", story })
    } catch (error) {
        res.status(501).json({ message: "internal server error" });
        console.log("Error in CreateStory function", error);

    };


};

export const getStory = async (req, res) => {
    try {
        const existingUser = req.user._id;

        const user = await User.findById(existingUser)

        const stories = await Story.find({ owner: { $in: user.following } })
        .populate("owner", "userName, profilePicture")
        .sort("-createdAt");

        res.status(200).json(stories);
    } catch (error) {
        return res.status(501).json({message:"internal server error"});
        console.log("error in getStories function: ", error)
    };
};

