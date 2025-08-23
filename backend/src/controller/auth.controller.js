import { User } from "../database/user.model.js";

export const callback=async (req,res,next)=>{

    try {
        const {id,firstName,lastName,imageUrl}=req.body;
        const user=await User.findOneAndUpdate({clerkId:id});

        if(!user) {
            await User.create({
                clerkId:id,
                fullName:`${firstName} ${lastName}`,
                imageUrl
            });
        } 
        res.status(200).json({message:"User has been registered..."});


    } catch (error) {
        console.log("error at the callback function in auth controller",error);
      next(error);
    }
}