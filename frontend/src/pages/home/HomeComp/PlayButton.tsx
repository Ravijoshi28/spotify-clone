import { Button } from "@/components/ui/ui/button";
import { UsePlayer } from "@/stores/usePlayer"
import type { Song } from "@/types";
import {  Pause, Play } from "lucide-react";


function PlayButton({song}:{song:Song}) {
    const {isPlaying,currentSong,togglePlay,setCurrentSong}=UsePlayer();
    const isSongPlaying=currentSong?._id===song._id;
  const handle=()=>{
        if(!song)return 
        
        if(isSongPlaying) togglePlay();
        else{
        setCurrentSong(song);}
}

  return (
    <>
    <Button size={"icon"} onClick={handle} className={`absolute 
        bottom-3 right-2 bg-green-500 hover:bg-green-400
        hover:scale-105 transition-all opacity-0 translate-y-2 group-hover:translate-y-0 ${isSongPlaying?"opacity-100":"opacity-0 group-hover:opacity-100"}`} >
         {isSongPlaying && isPlaying?(<Pause className="size-5 text-black"></Pause>):(<Play className="size-5 text-black"></Play>)}</Button>
    </>
  )
}

export default PlayButton   