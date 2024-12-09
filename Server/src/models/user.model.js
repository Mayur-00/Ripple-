import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    profilePic:{
        type:String,
        default:""
    },
    followers:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
],
    following:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
],
// posts:[
//     {
//         type:mongoose.Schema.Types.ObjectId,
//         ref:Post
//     }
// ]
},
{
    timestamps:true
}
);

const User = mongoose.model("User", UserSchema);
export default User;