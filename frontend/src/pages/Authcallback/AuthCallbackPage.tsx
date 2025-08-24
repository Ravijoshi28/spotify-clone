import { Card, CardContent } from "@/components/ui/card"
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { useEffect } from "react"
import {  useNavigate } from "react-router-dom";


function AuthCallbackPage(){
  const navigate=useNavigate();


  const {isLoaded,user}=useUser();
  useEffect(()=>{
    const syncUser=async ()=>{
      try {
        if(!isLoaded ||!user) return;

        await axiosInstance.post("/auth/callback",{
          id:user.id,
          firstName:user.firstName,
          lastName:user.lastName,
          imageUrl:user.imageUrl,
        })
      } catch (error) {
        console.log("error in authcallback",error);
      }
      finally{
          navigate("/");
      }
    }

    syncUser();
  },[isLoaded,user,navigate])
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
        <Card className="w-[90%] max-w-nd bg-zinc-900 border-zinc-800">
            <CardContent>
              <Loader/>
              <h1 className="text-zinc-400 text-xl font-bold">Logging you up</h1>
              <p className="text-zinc-400 text-sn">Redirecting...</p>
            </CardContent>
        </Card>
    </div>
  )
}

export default AuthCallbackPage