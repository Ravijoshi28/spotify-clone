import mongoose from "mongoose"


export const connectdb=async()=>{

    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected...");
    }
    catch(error){
        console.log("Something wrong with database connection.",error);
        process.exit(1);
    }
}