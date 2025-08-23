import { clerkClient } from "@clerk/express";

export const protectRoute=async (req,res,next)=>{
  const auth=req.auth();
  if(!auth.userId){
    res.status(404).json({message:"Unauthorised user"});
    return ;
  }
  next();
}

export const requireAdmin=async(req,res,next)=>{
 
  try {
    const auth=req.auth();
    const currentUser=await clerkClient.users.getUser(auth.userId);
    const isAdmin=process.env.ADMIN_EMAIL===currentUser.primaryEmailAddress?.emailAddress;
    
    if(!isAdmin){
       
     return res.status(403).json({message:"Admin authorization only"});
    }

    next();

   
  } catch (error) {
   
    next(error);
  }
 
 
}