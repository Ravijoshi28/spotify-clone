import FeaturedGridSkeleton from "@/skeleton/GridSkeleton"
import { useMusic } from "@/stores/useMusic"
import PlayButton from "./PlayButton"
import { Song } from "@/types"
import { UsePlayer } from "@/stores/usePlayer"


function Featured() {
  
  const {featuredSong,isloading,}=useMusic()
  const {setCurrentSong,togglePlay,currentSong}=UsePlayer();

 
  const handle=(s:Song)=>{
    if(currentSong?._id==s._id) togglePlay();
    
    else setCurrentSong(s);
    
  }

    if(isloading) return <FeaturedGridSkeleton/>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gaps-4 mb-8" >

        {featuredSong.map((f)=>(
          <div key={f._id} onClick={()=>handle(f)} className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden
          hover:bg-zinc-700/50 transition-colors group cursor-pointer relative">
            <img src={f.imageUrl} alt={f.title} className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"/>
            <div className="flex-1 p-4">
              <p className="font-medium truncate">{f.title}</p>
              <p className="text-sm text-zinc-400 truncate">{f.artist}</p>
            </div>
            <PlayButton song={f}/>
          </div>
          
        ))}
    </div>
  )
}

export default Featured 