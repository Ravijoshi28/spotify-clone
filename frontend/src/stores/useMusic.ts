import { axiosInstance } from "@/lib/axios";
import type { Album ,Song} from "@/types";
import toast from "react-hot-toast";
import {create} from "zustand";

interface MusicStore{
songs:Song[];
albums:Album[];
isloadingAlbum:boolean;
error:string|null;
albumById:Album|null;
forUSong:Song[],
treandingSong:Song[],
featuredSong:Song[],
isloading:boolean,
stats:{
totalArtist:number,
totalAlbum:number,
totalSong:number,
totalUser:number,},



fetchStats:()=>Promise<void>;
fetchSong:()=>Promise<void>
fetchAlbums:()=>Promise<void>;
fetchAlbumById:(id:string)=>Promise<void>;
fetchForU:()=>Promise<void>;
fetchFeaturedSong:()=>Promise<void>;
fetchTrandingSong:()=>Promise<void>;
deleteSong:(id:string)=>Promise<void>;
deleteAlbum:(id:string)=>Promise<void>;
}
export const useMusic=create<MusicStore>((set)=>({

    stats:{
    totalArtist:0,
    totalAlbum:0,
    totalSong:0,
    totalUser:0},

    albums:[],
    songs:[],
    albumById:null,
    isloadingAlbum:false,
    isloadingSong:false,
    treandingSong:[],
    featuredSong:[],
    forUSong:[],
    error:null,
    isloading:false,
    fetchAlbums:async ()=>{
                set({isloadingAlbum:true})
        try {
                
                const response=await axiosInstance.get("/albums")
                set({albums:response.data})
                
        } catch (error:any) {
            set({error:error.message})
        }finally{
            set({isloadingAlbum:false})
        }
    },

    fetchAlbumById:async(id)=>{
                set({isloadingAlbum:true})
        try {
            const response=await axiosInstance.get(`/albums/${id}`);
            set({albumById:response.data});
        } catch (error:any) {
            set({error:error.message})
            console.log("Error in fetching Album",error);
        }
        finally{
            set({isloadingAlbum:false});
        }
    },

    fetchForU:async ()=>{
            set({isloading:true})
        try {
            const response=await axiosInstance.get("/songs/made-for-you");
            set({forUSong:response.data})
        } catch (error:any) {
            set({error:error.message})
        }finally{
            set({isloading:false})
        }
    },

    fetchFeaturedSong:async ()=>{
     
            set({isloading:true})
        
            try {
            const response=await axiosInstance.get("/songs/featured");
            set({featuredSong:response.data})
        } catch (error:any) {
            set({error:error.message})
        }finally{
            set({isloading:false})
        }
    },

    fetchTrandingSong:async()=>{
        set({isloading:true})
            try {
            const response=await axiosInstance.get("/songs/trending");
            set({treandingSong:response.data})
        } catch (error:any) {
            set({error:error.message})
        }finally{
            set({isloading:false})
        }
    },

    fetchSong:async()=>{

         set({isloading:true,error:null})

         try {
            
            const response=await axiosInstance("/songs");
            set({songs:response.data})
            
         } catch (error:any) {
             set({error:error.response.message})
         }
         finally{
            set({isloading:false})
         }
    },
fetchStats:async()=>{
    set({isloading:true,error:null})
    try {
       
        const response=await axiosInstance.get("/stats");
        
        set({stats:{
            totalAlbum:response.data.totalAlbum,
            totalArtist:response.data.totalArtist,
            totalSong:response.data.totalSong,
            totalUser:response.data.totalUser,
        }})
    } catch (error:any) {
        set({error:error.response.message});

    }finally{
         set({isloading:false})
    }
     

},

deleteSong:async(id)=>{
    set({isloading:true,error:null})
    try {
        
       await axiosInstance.delete(`/admin/songs/${id}`)
        set(state=>({
            songs:state.songs.filter(song=>song._id!==id)
        }))
        toast.success("Song deleted successfully");
    } catch (error:any) {
        set({error:error.message})
        toast.error("Error while deleting message...");
    }finally{
        set({isloading:false});
    }
},

deleteAlbum:async(id)=> {
    set({isloading:true,error:null});
    try {
        
        await axiosInstance.delete(`/admin/albums/${id}`);
          console.log(id);
        set((state) => {
      
      const updatedAlbums = state.albums.filter((album) => album._id !== id);

     
      const updatedSongs = state.songs.map((song) =>
        song.albumId === id ? { ...song, album: null } : song
      );

      return {
        albums: updatedAlbums,
        songs: updatedSongs,
        isloading: false,
      };
    });
      toast.success("Album deleted...")
    } catch (error:any) {
        set({error:error.message})
        toast.error("Error while deleting message...");
    }finally{
        set({isloading:false});
    }
},

}))