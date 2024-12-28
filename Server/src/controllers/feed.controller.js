import Post from "../models/post.model.js"
import User from "../models/user.model.js";

export const getPostsForFeed = async (req, res) => {
    const userId = req.user._id;
    try {
        const posts = await Post.find({ auther: { $ne: userId } }).populate('auther', 'userName profilePic').sort({ createdAt: -1 });

        res.status(201).json(posts)
    } catch (error) {
        console.log("error in getPostsForFeed function:", error);
        res.status(501).json({ message: "internal server error" });
    };
};


export const getUsersForSuggestons = async (req, res) => {
    try {
        const loggedinUser = req.user._id;
        const fileterdUsers = await User.find({ _id: { $ne: loggedinUser } }).sort({ createdAt: -1 }).select("-password");

        res.status(200).json(fileterdUsers);
    } catch (error) {
        console.log(`error in getUsersForSlidebar controller: ${error}`);
        res.send(500).json({ message: "internal sever error" });
        

    };
};




