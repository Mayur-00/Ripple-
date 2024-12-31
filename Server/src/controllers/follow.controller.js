import User from "../models/user.model.js";


export const followUser = async (req, res) => {

    try {
        const { targetedUserid } = req.params;
        const userid = req.user._id;

        const targetUser = await User.findById(targetedUserid);

        if (!targetUser) {
            return res.status(404).json({ message: "user not found" });
        }

        if (targetedUserid === userid) {
            return res.status(403).json({ message: "you cant follow userself" });
        }

        const currentUser = await User.findById(userid);

        const isAlreadyFollowing = targetUser.followers.includes(userid);

        if (isAlreadyFollowing) {
            
                  // Remove the current user ID from the target user's followers array
            targetUser.followers = targetUser.followers.filter((id) => id.toString() !== userid.toString());

            // Remove the targeted user ID from the current user's following array
            currentUser.following = currentUser.following.filter((id) => id.toString() !== targetedUserid.toString( ));

            await currentUser.save();
            await targetUser.save();
    

        }

        currentUser.following.push(targetedUserid);
        targetUser.followers.push(userid);

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({
            message: "followed successfully",
            WhomeTooFollow: targetedUserid,
        })
    } catch (error) {
        console.log(`error followUser Function: ${error}`);
        return res.status(500).json({message:"internal server error"})

    }


};

export const removeFollower = async (req, res) => {
    try {
        const {targetedUserid} = req.params;
        const userid = req.user._id;

        const currentUserUpdate = await User.updateOne({_id:userid}, {$pull: {following:targetedUserid}});
        // comple function 

        res.status(200).json(currentUserUpdate)

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal server error"})


    }
}
