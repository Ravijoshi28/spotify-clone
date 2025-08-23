import { User } from "../database/user.model.js";
import { Message } from "../database/message.model.js";
export const getAllUser=async(req,res,next)=>{

    try {
        const auth=req.auth()
        const currentUser=auth.userId;
        const users=await User.find({clerkId:{$ne:currentUser}});

        res.status(200).json(users);
    } catch (error) {
        console.log("error in get user",error)
        next(error)
    }
}

export const getMessage=async(req,res,next)=>{
const auth=req.auth();
    try {
       const myId=auth.userId;
       const {userId}=req.params;
            
       const message=await Message.find({
      $or:[ {senderId:myId,receiverId:userId,
       },{senderId:userId,receiverId:myId}]}).sort({createdAt:1});
       res.status(200).json(message)
       
    } catch (error) {
        next(error)
    }
}