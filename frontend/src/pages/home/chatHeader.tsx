import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatUser } from "@/stores/useChatUser";

export const ChatHeader =()=>{
  const {selectedUser,onlineUser}=useChatUser();

  return (
    <div className="p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={selectedUser?.imageUrl}/>
          <AvatarFallback>{selectedUser?.fullName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">{selectedUser?.fullName}</h2>
          <p className="text-sm text-zinc-400">{selectedUser && onlineUser.has(selectedUser.clerkId) ? "online" : "offline"}</p>
        </div>
      </div>
    </div>
  )
}