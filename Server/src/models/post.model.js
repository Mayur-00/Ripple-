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
    postComments: [
        {
            userid: {
                type: mongoose.Schema.Types.ObjectId
            },
            content: String
        },
    ]
},
{
    timestamps:true
});

const Post = mongoose.model("Post", postSchema);

export default Post;
