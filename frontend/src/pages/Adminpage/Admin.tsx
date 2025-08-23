import { useAuthUser } from "@/stores/useAuthUser";
import Dashboard from "./Dashboard";
import Header from "./Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import SongComponent from "./component/SongComponent";
import AlbumComponent from "./component/AlbumComponent";
import { useMusic } from "@/stores/useMusic";
import { useEffect } from "react";


function Admin() {
    const {isAdmin}=useAuthUser();
    const {fetchStats,fetchAlbums,fetchSong ,deleteAlbum,deleteSong}=useMusic()
   
    useEffect(()=>{
        fetchAlbums();
        fetchSong();
        fetchStats();
    },[fetchAlbums,fetchSong,fetchStats,deleteAlbum,deleteSong])

    if(!isAdmin){
        return <div className="min-h-screen bg-gradient-to-b
        from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
            <h1 className="items-center ">Unauthorized User</h1></div>
    }
  return (
    <div className="min-h-screen bg-gradient-to-b
        from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
         <Header/>
        <Dashboard/>
        <Tabs defaultValue="songs" className="space-y-6">
            <TabsList className="p-1 bg-zinc-800/50">
                <TabsTrigger value="songs" className="data-[state-active]:bg-zinc-700 hover:cursor-pointer">
                    <Music className="mr-2 size-4"/>
                    Songs
                </TabsTrigger>
                <TabsTrigger value="albums" className="data-[state-active]:bg-zinc-700 hover:cursor-pointer">
                    <Album className="mr-2 size-4"/>
                    Albums
                </TabsTrigger>
            </TabsList>
            <TabsContent value="songs">
              <SongComponent/>
            </TabsContent>
            <TabsContent value="albums">
                <AlbumComponent/>
            </TabsContent>
        </Tabs>
           </div>
  )
}

export default Admin    