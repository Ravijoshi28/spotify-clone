import { Song } from "../database/songs.model.js";

export const getAllSongs=async(req,res,next)=>{

    try {
       const songs= await Song.find().sort({createdAt:-1});
       if(!songs) return res.status(404).json({message:"error in getAllsong function",error});

        else res.status(200).json(songs);
        } 

    catch (error) 
        {
        console.log("error in getAllSong function")
        next(error);
         }
}

export const getFeaturedSong=async(req,res ,next)=>{

    try {
        
            const songs=await Song.aggregate([{
                $sample:{size:6}
            },
        {
          $project:{
            _id:1,
            title:1,
            artist:1,
            imageUrl:1,
            audioUrl:1,
          }  
        }])
            res.status(200).json(songs);
    } catch (error) {
        console.log("error in get Featured song ",error);
        next(error)
    }
}

export const madeForU=async(req,res ,next)=>{

    try {
        
            const songs=await Song.aggregate([{
                $sample:{size:4}
            },
        {
          $project:{
            _id:1,
            title:1,
            artist:1,
            imageUrl:1,
            audioUrl:1,
          }  
        }])
            res.status(200).json(songs);
    } catch (error) {
        console.log("error in get Featured song ",error);
        next(error)
    }
}

export const trendingSong=async(req,res ,next)=>{

   try {
        
            const songs=await Song.aggregate([{
                $sample:{size:4}
            },
        {
          $project:{
            _id:1,
            title:1,
            artist:1,
            imageUrl:1,
            audioUrl:1,
          }  
        }])
            res.status(200).json(songs);
    } catch (error) {
        console.log("error in get Featured song ",error);
        next(error)
    }
}