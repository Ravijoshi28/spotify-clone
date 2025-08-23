import { Button } from "@/components/ui/ui/button";
import FeaturedGridSkeleton from "@/skeleton/GridSkeleton";
import type { Song } from "@/types"
import PlayButton from "./PlayButton";

type SectionProp={
    title:string;
    songs:Song[];
    isloading:boolean;
}

const Musicgrid=({songs,title,isloading}:SectionProp) =>{

        if(isloading)return <FeaturedGridSkeleton/>

  return (
    <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
            <Button variant="link" className="text-sm text-zinc-400 hover:text-white">
                Show All</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {songs.map((s)=>(
                    <div key={s._id}
                    className="bg-zinc-800/40 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer">
                        <div className="relative mb-4">
                            <div className="aspect-square rounded-mb shadow-lg overflow-hidden">
                                <img src={s.imageUrl} alt={s.title}
                                className="w-full h-full object-cover transition-transform duration-300"/>
                            </div>
                            <PlayButton song={s}/>
                        </div>
                        <h3 className="font-medium mb-2 truncate">{s.title}</h3>
                        <p className="text-sm text-zinc-400 truncate">{s.artist}</p>
                    </div>
                    
            ))}
        </div>
    </div>
  )
}

export default Musicgrid    