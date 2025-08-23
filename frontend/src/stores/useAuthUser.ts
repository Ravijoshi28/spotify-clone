import { axiosInstance } from "@/lib/axios";
import {create} from "zustand"

interface AuthStore{
    isAdmin:boolean;
    error:string|null;

    fetchIsAdmin: ()=>Promise<void>;
    reset: ()=>void
}
export const useAuthUser=create <AuthStore>((set)=>({

    isAdmin:false,
    error:null,
    fetchIsAdmin:async()=>{

        try {
            
            const response=await axiosInstance.get("/admin/check");
            set({isAdmin:response.data.admin})
            
        } catch (error:any) {
            set({error:error.response.data.message,isAdmin:false})
        }
    },
    reset:()=>{
            set({isAdmin:false,error:null})
    }

}))