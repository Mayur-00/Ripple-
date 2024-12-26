import cloudinary from "../lib/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";



export const createPost = async (req,res) => {
    try {
        const userid = req.user._id;
        const {content, postImage} = req.body;
        
          const uploadResponse = await cloudinary.uploader.upload(postImage);
        const post = await Post.create({
            auther:userid,
            postContent:content,
            postImage:uploadResponse.secure_url || ""
        });

        const user = await User.findById(userid);
        
        user.posts.push(post._id);

        await user.save();

        res.status(200).json(post)
        
    } catch (error) {
        console.log(`ERROR IN CREATE POST FUNCTION: ${error}`);
        return res.status(500).json({message:"Internal server error!"});
        
    };


};


export const getPosts = async (req,res) => {
    const userid = req.user._id;
    try {
        const user = await User.findById(userid).populate('posts'); 
        res.setHeader('X-Custom-Header', 'value'); 
        res.status(200).json(user.posts); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user posts' });
        return res.status(500).json({message:"Internal server error!"});
      } 

    };
