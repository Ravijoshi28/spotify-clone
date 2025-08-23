import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/ui/button';
import { UsePlayer } from '@/stores/usePlayer'
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat1, Shuffle, SkipBack, SkipForward, Volume1 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const formatTime=(seconds:number)=>{
const minutes=Math.floor(seconds/60);
const rem=Math.floor(seconds%60);
return `${minutes}:${rem.toString().padStart(2,"0")}`;
}

export const PlayBack=()=> {

    const {isPlaying,currentSong,playNext,playPrevious,togglePlay}=UsePlayer();
    const [volume,setVolume]=useState(50);
    const [time,setTime]=useState(0);
    const [duration,setDuration]=useState(50);
    const audioRef=useRef<HTMLAudioElement>(null);

    useEffect(()=>{
        audioRef.current=document.querySelector("audio");
        const audio=audioRef.current;

        if(!audio) return;

        const updateTime=()=>setTime(audio.currentTime)
        const updateDuration=()=>setDuration(audio.duration)

        const handleEnded=()=>{
            UsePlayer.setState({isPlaying:false});
        }
        audio.addEventListener("timeupdate", updateTime);
  audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("ended",handleEnded);

        return()=>{
            audio.removeEventListener("timeupdate",updateTime)
            audio.removeEventListener("loadedmetadata",updateDuration);
            audio.removeEventListener("ended",handleEnded);
        }
    },[currentSong])

    const handleSeek=(value:number[])=>{
        if(audioRef.current){
            audioRef.current.currentTime=value[0]
        }
    }

  return (
    <footer className='h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4'>

        <div className='flex justify-between items-center h-full max-w-[1800px] mx-auto'>

            <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
                {currentSong && (
                    <>
                    <img src={currentSong.imageUrl} alt={currentSong.title}
                    className='w-14 h-14 object-contain rounded-md'/>
                    <div className='flex-1 min-w-0'>
                        <div className='font-medium truncate hover:underline cursor-pointer'>
                            {currentSong.title}
                        </div>
                        <div className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
                            {currentSong.artist}
                        </div>
                    </div>
                    </>
                )}
            </div>

            <div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
                <div className='flex items-center gap-4 sm:gap-6'>
                    <Button size="icon" variant="ghost" className='hidden sm:inline-flex hover:text-black text-zinc-400'>
                        <Shuffle className='h-4 w-4'/>
                    </Button>

                    <Button onClick={playPrevious} disabled={!currentSong} size="icon" variant="ghost" className='hidden sm:inline-flex hover:text-black text-zinc-400'>
                        <SkipBack className='h-4 w-4'/>
                    </Button>
                    <Button onClick={togglePlay} disabled={!currentSong} size="icon" variant="ghost" className='hidden sm:inline-flex  bg-white rounded-full hover:text-black text-zinc-800'>
                      {isPlaying ?(<Pause className='h-4 w-4 '/>):(<Play className='h-4 w-4 '/>) }  
                    </Button>
                    <Button onClick={playNext} disabled={!currentSong} size="icon" variant="ghost" className='hidden sm:inline-flex hover:text-black text-zinc-400'>
                     <SkipForward className='h-4 w-4' />
                    </Button>
                     <Button  size="icon" variant="ghost" className='hidden sm:inline-flex hover:text-black text-zinc-400'>
                     <Repeat1 className='h-4 w-4' />
                    </Button>

                </div>
                  <div className='hidden sm:flex items-center gap-2 w-full'>
                <div className='text-xs text-zinc-100'>{formatTime(time)}</div>
                <Slider value={[time]}
                max={duration||100}
                step={1}
                className='w-full  hover:cursor-grab active:cursor-grabbing'
                onValueChange={handleSeek}/>
                <div className='text-xs text-zinc-400'>{formatTime(duration)}</div>
                </div>
            </div>

          
            <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
                <Button size="icon" variant="ghost" className='hover:text-black text-zinc-400'>
                    <Mic2 className='h-4 w-4'/>
                </Button>
                <Button size="icon" variant="ghost" className='hover:text-black text-zinc-400'>
                    <ListMusic className='h-4 w-4'/>
                </Button>
                <Button size="icon" variant="ghost" className='hover:text-black text-zinc-400'>
                    <Laptop2 className='h-4 w-4'/>
                </Button>

                <div className='flex items-center gap-2'>
                        <Button size="icon" variant="ghost" className='hover:text-black text-zinc-400'>
                            <Volume1/>
                        </Button>
                        <Slider value={[volume]} max={100} step={1} 
                        className='w-20 hover:cursor-grab active:cursor-grabbing'
                        onValueChange={(value)=>{
                            setVolume(value[0]);
                            if(audioRef.current){
                                audioRef.current.volume=value[0]/100;
                            }
                        }}/>
                </div>
            </div>
            
        </div>
    </footer>
  )
}

export default PlayBack