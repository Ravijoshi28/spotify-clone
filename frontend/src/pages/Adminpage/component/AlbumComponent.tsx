import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music } from "lucide-react"
import AlbumTable from "./AlbumTable"
import CreateAlbum from "../CreatePages/CreateAlbum"


function SongComponent() {
  return (
    <Card className="bg-zinc-800 ">
        <CardHeader>
            <div className="flex items-center justify-between ">
                <div>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Music className="size-5 text-emerald-500"/>Album Library
                    </CardTitle>
                    <CardDescription className="text-white">Manage Your Music Tracks</CardDescription>
                </div>
                <CreateAlbum/>
            </div>
        </CardHeader>
        <CardContent className="text-zinc-400">
            <AlbumTable/>
        </CardContent>
    </Card>
  )
}

export default SongComponent