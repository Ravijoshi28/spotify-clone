import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/ui/button";
import { useMusic } from "@/stores/useMusic";
import { UsePlayer } from "@/stores/usePlayer";
import {   ClockFading, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"


export const formatDuration=(seconds:number)=>{
const minutes=Math.floor(seconds/60);
const remsec=seconds%60;
return `${minutes}:${remsec.toString().padStart(2,"0")}`;
}

function AlbumPage() {
  const {albumId} =useParams();
  const {isloadingAlbum,fetchAlbumById,albumById}=useMusic()
  const {currentSong,isPlaying,playAlbum,togglePlay}=UsePlayer();
  useEffect(()=>{

    if(albumId) fetchAlbumById(albumId);
  },[fetchAlbumById,albumId])

 
  if(isloadingAlbum) return <div>Loading album</div>

  const handlePlay=()=>{

    if(!albumById) return;
    const isCurrentlyPlaying=albumById?.songs.some(song=>song._id===currentSong?._id)

    if(isCurrentlyPlaying) togglePlay();

    else{
      playAlbum(albumById?.songs,0);
    }
  }

  const handlePlayAlbum=(index=0)=>{
    if(!albumById) return
   
  const song = albumById.songs[index];
  const isSameSong = currentSong?._id === song._id;

  if (isSameSong) {
    
    togglePlay();
  } else {
   
    playAlbum(albumById.songs, index);
  }
  }

  return (
    <div className="h-full">
      <ScrollArea className="h-full">

            <div className="relative min-h-full">

  <div
    className="absolute rounded inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 pointer-events-none z-0"
    aria-hidden="true"
  />

 
  <div className="relative z-10">
    <div className="flex p-6 gap-6 pb-8">
      <img
        src={albumById?.imageUrl}
        alt={albumById?.title}
        className="w-[240px] h-[240px] shadow-xl rounded"
      />
      <div className="flex flex-col justify-end">
        <p className="text-sm font-medium">Album</p>
        <h2 className="text-7xl font-bold my-4">{albumById?.title}</h2>
        <div className="flex items-center gap-2 text-zinc-100">
          <p className="text-white font-medium">{albumById?.artist}</p>
          <span>• {albumById?.songs.length} songs</span>
         <span>• {albumById?.releaseYear ? new Date(albumById.releaseYear).toISOString().split("T")[0] : "—"}</span>
        </div>
      </div>
    </div>

        <div className="px-6 pb-4 flex items-center gap-6">
          <Button onClick={()=>handlePlay()} className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all">
            {isPlaying && albumById?.songs.some((song)=>song._id===currentSong?._id)?(
              <Pause className="h-7 w-7 text-black"></Pause>
            ):(<Play className="h-7 w-7 text-black"></Play>)}
            
          </Button>
        </div>

        <div className="bg-gray-900 backdrop-blur-2xl rounded-sm">
            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm">
              <div>#</div>
              <div>Title</div>
              <div>Release Date</div>
              <div>
                <ClockFading className="h-4 w-4"/>
              </div>
            </div>

            <div className="px-6">
              <div className="space-y-2 py-4">
                {albumById?.songs.map((s,index)=>{

                  const isCurrentSong=currentSong?._id===s._id
                  return (
                    <div
                    onClick={()=>handlePlayAlbum(index)}
                     className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm
                     text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                      key={s._id}>
                        <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying?(
                            <div className="size-4 text-green-500">♫</div>
                          ):(<span className="group-hover:hidden">{index+1}</span>)}
                          {!isCurrentSong && <Play className="h-4 w-4 hidden group-hover:block"/>}
                        </div>

                        <div className="flex items-center gap-3">
                          <img src={s.imageUrl} alt={s.title} className="size-10"/>
                          <div>
                            <div className="font-medium text-white">{s.title}</div>
                            <div className="">{s.artist}</div>
                          </div>
                        </div>
                         <div className="flex items-center">{s.createdAt instanceof Date
            ? s.createdAt.toISOString().split("T")[0]
              : new Date(s.createdAt).toISOString().split("T")[0]}</div>
                          <div className="flex items-center">{formatDuration(s.duration)}</div>
                      </div> )
})}
              </div>
            </div>

        </div>

  </div>
</div>


      </ScrollArea>

    </div>
  )
}

export default AlbumPage   