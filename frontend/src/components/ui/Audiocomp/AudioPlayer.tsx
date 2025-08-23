import { UsePlayer } from "@/stores/usePlayer";
import {  useEffect, useRef } from "react"


function AudioPlayer() {
    const audioRef=useRef<HTMLAudioElement>(null);
    const prevRef=useRef<string|null>(null);
    
    const {isPlaying,currentSong,playNext}=UsePlayer();

    useEffect(()=>{
        if(isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    },[isPlaying]);

    useEffect(()=>{
        const audio=audioRef.current;

        const handleEnded=()=>{
            playNext();
        }

        audio?.addEventListener("ended",handleEnded);
        return ()=> audio?.removeEventListener("ended",handleEnded)
    },[playNext])

    useEffect(()=>{
        if(!audioRef.current ||!currentSong) return

        const audio=audioRef.current;

        const isSongChange=prevRef.current!==currentSong?.audioUrl;

        if(isSongChange){
            audio.src=currentSong?.audioUrl;
            audio.currentTime=0;

            prevRef.current=currentSong?.audioUrl;

            if(isPlaying){
                audio.play();
            }
        }
    },[currentSong,isPlaying])

  return (
   <audio ref={audioRef} />
  )
}

export default AudioPlayer  