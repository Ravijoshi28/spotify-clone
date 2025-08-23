import Topbar from "@/components/ui/Topbar"
import { useMusic } from "@/stores/useMusic"
import { useEffect } from "react"
import Featured from "./HomeComp/Featured";
import { ScrollArea } from "@/components/ui/scroll-area";
import Musicgrid from "./HomeComp/Musicgrid";
import { UsePlayer } from "@/stores/usePlayer";



function Home() {

  const {fetchForU,treandingSong,fetchFeaturedSong
    ,fetchTrandingSong,isloading,featuredSong,
    forUSong}=useMusic();

    const {initializeQueue}=UsePlayer();

useEffect(()=>{
  fetchFeaturedSong();
  fetchForU();
  fetchTrandingSong();
},[fetchForU,fetchFeaturedSong,fetchTrandingSong])

useEffect(()=>{
  if(forUSong.length>0 && treandingSong.length>0 && featuredSong.length>0){
    const allSongs=[...featuredSong,...forUSong,...treandingSong];
    initializeQueue(allSongs)
  }
},[initializeQueue,forUSong,treandingSong,featuredSong])


  return (
    <main className="rounded-sm overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
    <Topbar/>
    <ScrollArea className="h-[calc(100vh-180px)]">
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good Morning</h1>
      <Featured/>
    </div>
    <div className="space-y-8">
      <Musicgrid title="Made For U" songs={forUSong} isloading={isloading}/>
      <Musicgrid title="trending" songs={treandingSong} isloading={isloading}/>
    </div>

    </ScrollArea>
    </main>
  )
}

export default Home  