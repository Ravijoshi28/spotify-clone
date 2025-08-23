import { HomeIcon,  Library } from "lucide-react"
import { Link } from "react-router-dom"
import { buttonVariants } from "../components/ui/ui/button"
import { cn } from "@/lib/utils"
import { SignedIn } from "@clerk/clerk-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import PlaylistSkeleton from "@/skeleton/PlaylistSkeleton"
import { useMusic } from "@/stores/useMusic"
import { useEffect } from "react"



function LeftSidebar() {

const {isloadingAlbum,albums,fetchAlbums}=useMusic();

  useEffect(()=>{
    fetchAlbums();
 
  },[fetchAlbums])

   

  return (
    <div className="h-full flex flex-col gap-2">
        <div className="rounded-lg bg-zinc-900 p-4">
            <div className="space-y-2 ">
                <Link to={"/"} className={cn(buttonVariants({
                  variant:"ghost",
                  className:"w-full justify-start text-white hover:bg-zinc-600"
                }))}>
                <HomeIcon className="mr-2 size-5"/><span className="hidden md:inline">Home</span></Link>

                <SignedIn>
                     <Link to={"/chat"} className={cn(buttonVariants({
                  variant:"ghost",
                  className:"w-full justify-start text-white hover:bg-zinc-600"
                }))}>
                <HomeIcon className="mr-2 size-5"/><span className="hidden md:inline">Messages...</span></Link>
                </SignedIn>
            </div>
        </div>

        
         <div className="flex-1 rounded-lg flex-col h-full p-4 bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-white px-2">
                    <Library className="mr-2 size-5"/>
                    <span className="hidden md:inline">Playlist</span>
                </div>
          </div>
             <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="">
                  {isloadingAlbum?<PlaylistSkeleton/>:(
                    albums.map((a)=>(
                      <Link to={`/albums/${a._id}`}
                    key={a._id} className="p-2 hover:bg-zinc-800
                    rounded-md flex items-center gap-3 group cursor-pointer">
                      <img src={a.imageUrl} alt="album image" className="size-12 rounded-md flex-shrink-0 object-cover"/>
                      <div className="flex-1 min-w-0 hidden md:block">
                            <p className="font-medium truncate">{a.title}</p>
                            <p className="text-sm text-zinc-400 truncate">Album • {a.artist}</p>
                      </div>
                    </Link>
                    ))
                  )}
                </div> 
             </ScrollArea>
        </div>

    </div>
  )
}

export default LeftSidebar