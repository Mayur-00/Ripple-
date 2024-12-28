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



    export const likePost = async (req, res) => {
      try {
          const userId = req.user._id;
          const { postId } = req.params;
  
          const post = await Post.findById(postId);
  
          if (!post) {
              return res.status(404).json({ message: "post not found" });
          };


          if (post.likes.indexOf(userId) === -1) {
            post.likes.push(userId);
        } else {
            post.likes.splice(post.likes.indexOf(userId));
        }


  
          await post.save();
  
          res.status(200).json(post.likes);
  
  
      } catch (error) {
          res.status(500).json({ message: "internal server error" });
          console.log("ERROR IN LIKE POST FUNCTION ", error)
  
      };
  
  
  };
