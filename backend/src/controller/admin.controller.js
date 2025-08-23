import { Song} from "../database/songs.model.js";
import { Album } from "../database/album.model.js";
import cloudinary from "../lib/cloudinary.js";


const uploadToCloudinary = async (file) => {
	try {
		const result = await cloudinary.uploader.upload(file.tempFilePath, {
			resource_type: "auto",
		});
		return result.secure_url;
	} catch (error) {
		console.log("Error in uploadToCloudinary", error);
		throw new Error("Error uploading to cloudinary");
	}
};

export const createSong=async (req,res,next)=>{
    
    try {
        console.log("done")
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
          return  res.status(404).json({message:"Please upload all files"});
        }


        const {title,artist,albumId,duration}=req.body;
        const audio=req.files.audioFile;
        const image=req.files.imageFile;

        const audioUrl=await uploadToCloudinary(audio)
        const imageUrl=await uploadToCloudinary(image)

        const song=new Song({
            title,
            artist,
            albumId:albumId || null
            ,duration,
            imageUrl,
            audioUrl,
        })

        await song.save();

        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push:{songs:song._id},
            })
        }
        res.status(200).json({message:"Song has been uploaded"});

    } catch (error) {
        console.log("error in song adding",error)
        next(error)
    }
}

export const deleteSong=async(req,res,next)=>{

    try {
        
      const {id}  =req.params;
        const song=await Song.findById(id);
      if(song.albumId){
        await Album.findByIdAndUpdate(song.albumId,{
            $pull:{songs:song._id},
        })
      }
      await Song.findByIdAndDelete(id);
      res.status(200).json({message:"Song deleted"});
    



    } catch (error) {
        console.log("Error in delete func",error);
        next(error);
    }
}

export const createAlbum=async(req,res,next)=>{

    try {
       
        const {title,artist,releaseYear}=req.body;
        const {imageFile}=req.files;

        const imageUrl=await uploadToCloudinary(imageFile);

        const album=new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        })
        
        album.save();
       
        res.status(200).json({message:"Album is created"});

    } catch (error) {
        console.log("error in create album function",error);
        next(error);
    }
}

export const deleteAlbum=async(req,res,next)=>{
const {id}=req.params;
    try {
        if(!id)  console.log("error in deleteAlbum ...");

      
        await Song.deleteMany({id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message:"Album has been deleted"});
        } 
    catch (error) 
        {
        console.log("error in deleteAlbum ...",error);
        next(error);
         }
}

export const checkAdmin=async(req,res)=>{
    res.status(200).json({admin:true});
}