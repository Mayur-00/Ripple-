import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
    {
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        image:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        },
    }
);

storySchema.index({createdAt: 1}, {expireAfterSeconds: 86400});

const Story = mongoose.model("Story", storySchema);

export default Story;