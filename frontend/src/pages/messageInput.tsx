import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/ui/button";
import { useChatUser } from "@/stores/useChatUser";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react"


function  MessageInput() {
        const [newMessage,setMessage]=useState("");
    const {user}=useUser();
    const {selectedUser,sendMessage}=useChatUser();

    const handleSend=()=>{
        if(!selectedUser || !user ||!newMessage.trim()) return ;
        sendMessage(selectedUser.clerkId,user.id,newMessage.trim());
        setMessage("");
    }

  return (

    <div className='p-4 mt-auto border-t border-zinc-800'>
			<div className='flex gap-2'>
				<Input
					placeholder='Type a message'
					value={newMessage}
					onChange={(e) => setMessage(e.target.value)}
					className='bg-zinc-800 border-none'
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>

				<Button size={"icon"} onClick={handleSend} disabled={!newMessage.trim()}>
					<Send className='size-4' />
				</Button>
			</div>
		</div>
  )
}

export default MessageInput