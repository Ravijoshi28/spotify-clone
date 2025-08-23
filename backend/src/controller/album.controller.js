import { Album } from "../database/album.model.js";

export const getAllAlbum=async(req,res,next)=>{

try {
    
   const albums= await Album.find();
   
   res.status(200).json(albums);
   
} catch (error) {
    console.log("error in getAllalbum function ",error)
    next(error)
}

}

export const getAlbum=async(req,res,next)=>{

    try {
        const {albumId}=req.params;

        const album=await Album.findById(albumId).populate("songs");

        if(!album) return res.status(404).json({message:"album does not exist..."});
       else res.status(200).json(album)


    } catch (error) {
       console.log("error in getalbum fuction");
        next(error);
    }
}