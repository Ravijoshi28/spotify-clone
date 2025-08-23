import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/ui/button"
import { useMusic } from "@/stores/useMusic"
import { Calendar, Trash } from "lucide-react"

function SongsTable() {
    const {songs,isloading,deleteSong}=useMusic()

    const deleteSelectedSong=(id: string)=>{
        deleteSong(id);
    }

    if(isloading) return (<div className="h-full items-center bg-zinc-800 text-zinc-400 ">Loading Songs</div>)

  return (
    <div>
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-zinc-800/50">
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { songs.map((s)=>(
        <TableRow key={s._id} className="hover:bg-zinc-800/80">
            <TableCell ><img src={s.imageUrl} alt={s.title} className="size-10 rounded object-cover"/></TableCell>
            <TableCell className="font-medium">{s.title}</TableCell>
            <TableCell >{s.artist}</TableCell>
            <TableCell className="">
                <span className="inline-flex items-center gap-1 text-zinc-400">
                    <Calendar className="h-4 w-4"/>
                    {s.createdAt ? new Date(s.createdAt).toISOString().split("T")[0]:"-"}
                </span>
            </TableCell>
            <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                    <Button variant={"ghost"} size={"sm"} className="text-red-400 hover:text-red-600 hover:bg-zinc-400/10 " 
                   onClick={()=>deleteSelectedSong(s._id)} >
                    <Trash/></Button>
                </div>
            </TableCell>
        </TableRow>)) }
            </TableBody>
        </Table>
    </div>
  )
}

export default SongsTable