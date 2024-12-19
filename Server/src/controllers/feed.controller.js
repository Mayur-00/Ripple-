import Post from "../models/post.model.js"

export const getPostsForFeed  = async (req, res) =>{
    try {
        const posts = await Post.find()

        res.status(201).json (posts)
    } catch (error) {
        console.log("error in getPostsForFeed function:", error);
        res.send(501).json({message:"internal server error"});
    }
}