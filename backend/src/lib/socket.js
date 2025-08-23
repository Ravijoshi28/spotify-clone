import {Server} from "socket.io";
import { Message } from "../database/message.model.js";

export const initializeSocket=(server)=>{
    const io=new Server (server,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true,
        }
    });

    const userSockets=new Map();
    const userActivities=new Map();

    io.on("connection",(socket)=>{
        socket.on("user_connected",(userId)=>{
            userSockets.set(userId,socket.id);
                userActivities.set(userId,"Idle");
            
                socket.emit("user_online",Array.from(userSockets.keys()));

                io.emit("activities",Array.from(userActivities.entries()));

                socket.broadcast.emit("user_connected", userId);
        })

        socket.on("update_activities",({userId,activity})=>{
            userActivities.set(userId,activity);
            io.emit("activity_updated",{userId,activity});
        })
    
        socket.on("send_message",async(data)=>{
            try {
                const{receiverId,senderId,content}=data;
                const message=await Message.create({
                    senderId,
                    receiverId,
                    content
                })
                 const senderSocketId = userSockets.get(senderId);
                const receiverSocketId=userSockets.get(receiverId);
              if (senderSocketId) {
            io.to(senderSocketId).emit("receive_message", message);
        }
     
              
                if(receiverSocketId){
                    io.to(receiverSocketId).emit("receive_message",message);
                             }
            } catch (error) {
                console.log("Message Error",error);
                socket.emit("message_error",error.message);
            }
        })

        socket.on("disconnect",()=>{
            let disconectUserid;
            for(const [userId,socketId] of userSockets.entries()){
                if(socketId===socket.id){
                    disconectUserid=userId;
                    userSockets.delete(userId);
                    userActivities.delete(userId);
                    break;
                }
            }
            if(disconectUserid){
                io.emit("user_disconnected",disconectUserid);
            }
        })
    });
}