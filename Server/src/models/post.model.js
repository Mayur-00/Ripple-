import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    auther: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postContent: {
        type: String
    },
    postImage: {
        type: String
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            comment: String,
            createdAt:{
                type:Date,
                default:Date.now()
            }
            
        },
    ]
},
{
    timestamps:true
});

const Post = mongoose.model("Post", postSchema);

export default Post;
