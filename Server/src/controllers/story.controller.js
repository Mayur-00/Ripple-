import cloudinary from "../lib/cloudinary.js";
import Story from "../models/story.model.js";
import User from "../models/user.model.js";


export const createStory = async (req, res) => {
    try {
        const existingUser = req.user._id;
        const {image} = req.body;
      const uploadResponse = await cloudinary.uploader.upload(image);
        
        const story = new Story({
            owner: existingUser,
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
        .populate("owner", "userName profilePic")
        .sort("-createdAt");

        res.status(200).json(stories);
    } catch (error) {
        return res.status(501).json({message:"internal server error"});
        console.log("error in getStories function: ", error)
    };
};

export const getAuthUsersStory = async (req,res) => {
    const userId = req.user._id;
    try {
        const userStory = await Story.findOne({owner:userId}).populate("owner", "userName profilePic")

        if(!userStory){
            return res.status(404).json({message:"no story found for the user"})
        }
        // console.log(userStory)
        res.status(200).json(userStory)
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
        console.log("error in getAuthUsersStory function", error)
    }

}

