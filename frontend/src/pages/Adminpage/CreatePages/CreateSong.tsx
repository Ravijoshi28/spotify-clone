import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/ui/button";
import { axiosInstance } from "@/lib/axios";
import { useMusic } from "@/stores/useMusic"
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface NewSong{
	   title:string,
    artist:string,
    albumId:string,
    duration:string,}

function CreateSong() {

  const {albums}=useMusic();
  const [songDialogOpen,setSongDialog]=useState(false);
  const [isloading,setLoading]=useState(false);

  const [newSong,setNewSong]=useState<NewSong>({
    title:"",
    artist:"",
    albumId:"",
    duration:"0",
  })

  const [files,setFiles]=useState<{ audioFile: File | null; imageFile: File | null }>({
    audioFile:null,
    imageFile:null,
  })
  const audioRef=useRef<HTMLInputElement>(null);
  const imageRef=useRef<HTMLInputElement>(null);

  const handleSubmit=async()=>{
	setLoading(true);

	try {
		if(!files.audioFile ||!files.imageFile) return toast.error("Please Upload both audio and video files...");

		const formData=new FormData();

		formData.append("title",newSong.title);
		formData.append("artist",newSong.artist);
		formData.append("duration",newSong.duration);

		if(newSong.albumId && newSong.albumId!="none"){
			formData.append("albumId",newSong.albumId);
		}

		formData.append("audioFile",files.audioFile);
		formData.append("imageFile",files.imageFile);
		
		
		await axiosInstance.post("/admin/songs",formData);


		setNewSong({
			title:"",
			artist:"",
			albumId:"",
			duration:"0",
		})

		setFiles({
			audioFile:null,
			imageFile:null,
		})
		toast.success("Song uploaded successfully")
		
	} catch (error:any) {
		toast.error("Song not uploaded"+error)
		
	}finally{
	setLoading(false);}
  }


  

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialog}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
          <Plus className="mr-2 h-4 w-4 "/>Add Song
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
        <DialogHeader >
          <DialogTitle >Add New Song</DialogTitle>
          <DialogDescription>Add a song to your library</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <input type="file" accept="audio/*"
            hidden
            ref={audioRef}
            onChange={(e)=>setFiles((prev)=>({...prev,audioFile:e.target.files![0]}))}></input>
             <input type="file" accept="image/*"
            hidden
            ref={imageRef}
            onChange={(e)=>setFiles((prev)=>({...prev,imageFile:e.target.files![0]}))}/>

            <div
						className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
						onClick={() => imageRef.current?.click()}
					>
						<div className='text-center'>
							{files.imageFile ? (
								<div className='space-y-2'>
									<div className='text-sm text-emerald-500'>Image selected:</div>
									<div className='text-xs text-zinc-400'>{files.imageFile.name.slice(0, 20)}</div>
								</div>
							) : (
								<>
									<div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
										<Upload className='h-6 w-6 text-zinc-400' />
									</div>
									<div className='text-sm text-zinc-400 mb-2'>Upload Your Work</div>
									<Button variant='outline' size='sm' className='text-xs'>
										Choose File
									</Button>
								</>
							)}
						</div>

					</div>
                 <div className='space-y-2'>
						<label className='text-sm font-medium'>Audio File</label>
						<div className='flex items-center gap-2'>
							<Button variant='outline' onClick={() => audioRef.current?.click()} className='w-full'>
								{files.audioFile ? files.audioFile.name.slice(0, 20) : "Choose Audio File"}
							</Button>
						</div>
					</div>

         <div className='space-y-2'>
						<label className='text-sm font-medium'>Title</label>
						<Input
							value={newSong.title}
							onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium'>Artist</label>
						<Input
							value={newSong.artist}
							onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium'>Duration (seconds)</label>
						<Input
							type='number'
							min='0'
							value={newSong.duration}
							onChange={(e) => setNewSong({ ...newSong, duration: e.target.value  ||"0" })}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>

          <div className='space-y-2'>
						<label className='text-sm font-medium'>Album (Optional)</label>
						<Select
							value={newSong.albumId}
							onValueChange={(value) => setNewSong({ ...newSong, albumId: value })}
						>
							<SelectTrigger className='bg-zinc-800 border-zinc-700'>
								<SelectValue placeholder='Select album' />
							</SelectTrigger>
							<SelectContent className='bg-zinc-800 border-zinc-700 text-zinc-300'>
								<SelectItem  value='none'>No Album (Single)</SelectItem>
								{albums.map((album) => (
									<SelectItem key={album._id} value={album._id}>
										{album.title}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					</div>
					<DialogFooter>
					<Button variant='outline' onClick={() => setSongDialog(false)} disabled={isloading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isloading}>
						{isloading ? "Uploading..." : "Add Song"}
					</Button>
				</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateSong