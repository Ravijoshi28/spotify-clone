import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/ui/button';
import { axiosInstance } from '@/lib/axios';
import { Plus, Upload } from 'lucide-react';
import  { useRef, useState } from 'react'
import toast from 'react-hot-toast';

function CreateAlbum() {

    const [albumDialpgOpen,setAlbumDialog]=useState(false);
    const [isloading,setLoading]=useState(false);
    const fileInputRef=useRef<HTMLInputElement>(null)

    const [newAlbum,setNewAlbum]=useState({
      title:"",
      artist:"",
      releaseYear:new Date().getFullYear(),
    });

    const [imagefiles,setFiles]=useState<File|null>(null);

    const handleImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const file=e.target.files?.[0];
      if(file){
        setFiles(file);
      }
    }

    const handleSubmit=async()=>{
      setLoading(true);

      try {
        if(!imagefiles) return toast.error("Please upload Album image...");

        const formData=new FormData();
      
        formData.append("title",newAlbum.title);
        formData.append("artist",newAlbum.artist);
        formData.append("releaseYear",newAlbum.releaseYear.toString());
        formData.append("imageFile",imagefiles);

        await axiosInstance.post("/admin/albums",formData);
        setNewAlbum({
           title:"",
      artist:"",
      releaseYear:new Date().getFullYear(),
        })
        setFiles(null);
        setAlbumDialog(false);
        toast.success("Album created");
      } catch (error:any) {
        toast.error("Error in creating Album"+error.message);
      }finally{
        setLoading(false)
      }
    }

  return (
     <Dialog open={albumDialpgOpen} onOpenChange={setAlbumDialog}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
          <Plus className="mr-2 h-4 w-4 "/>Add Album
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
        <DialogHeader >
          <DialogTitle >Add New Album</DialogTitle>
          <DialogDescription>Add a Album to your library</DialogDescription>
        </DialogHeader>
        
          <div className='space-y-4 py-4'>
					<input
						type='file'
						ref={fileInputRef}
						onChange={handleImage}
						accept='image/*'
						className='hidden'
					/>
					<div
						className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
						onClick={() => fileInputRef.current?.click()}
					>
						<div className='text-center'>
							<div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
								<Upload className='h-6 w-6 text-zinc-400' />
							</div>
						<div className='text-center'>
							{imagefiles?imagefiles.name:"Upload Album artwork"}
						</div>

					</div>
          </div>
         <div className='space-y-2'>
						<label className='text-sm font-medium'>Title</label>
						<Input
							value={newAlbum.title}
              onChange={(e)=>setNewAlbum({...newAlbum,title:e.target.value})}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium'>Artist</label>
						<Input
							value={newAlbum.artist}
              onChange={(e)=>setNewAlbum({...newAlbum,artist:e.target.value})}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>
					</div>
					<DialogFooter>
					<Button variant='outline'  disabled={isloading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isloading}>
						{isloading ? "Uploading..." : "Add Album"}
					</Button>
				</DialogFooter>

        </DialogContent>
      </Dialog>
  )
}

export default CreateAlbum  