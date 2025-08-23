import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react"
import {  useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuthUser } from "@/stores/useAuthUser";
import { useChatUser } from "@/stores/useChatUser";
const updateApiToken=async(token:string | null)=>{

    if(token){
        axiosInstance.defaults.headers.common['Authorization']=`Bearer ${token}`
    }
    else {
       delete axiosInstance.defaults.headers.common['Authorization']
    }
}

const AuthProvider=({children}:{children:React.ReactNode})=> {
    const {getToken,userId}=useAuth();
    const [loading,setLoading]=useState(true);
    const {fetchIsAdmin}=useAuthUser();
    const {initSocket,disconnectSocket}=useChatUser();
    useEffect(() => {
      const initAuth=async ()=>{

        try {
            const token=await getToken();
            updateApiToken(token);

            if(token){
                
               await fetchIsAdmin();

               if(userId) initSocket(userId)
            }
        } catch (error) {
            updateApiToken(null);
           console.log("Error in Authorization ") 
        }finally{
            setLoading(false)
        } 
      }

      initAuth();

      return ()=>disconnectSocket();
    }, [getToken,userId,fetchIsAdmin,initSocket,disconnectSocket])
    

    if(loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
            <Loader className="size-8 text-emerald-500 animate-spin"/>
            </div>
        )
    }

 return (
  <div>
    {children}
  </div>
 )
};

export default  AuthProvider   