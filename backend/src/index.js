import express from "express"
import { clerkMiddleware } from '@clerk/express'
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import albumsRoutes from "./routes/albums.routes.js"
import statsRoutes from "./routes/stats.routes.js"
import songsRoutes from "./routes/songs.routes.js"
import fileUpload from "express-fileupload"
import {connectdb} from "./lib/moongose_db.js"
import path from "path";
import cors from "cors"
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";
import crons from "node-cron"
import fs from "fs"

dotenv.config();

const __dirname = path.resolve();
const PORT=process.env.PORT

const app=express();
const httpServer=createServer(app);
initializeSocket(httpServer)

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}

))

app.use(express.json());
app.use(clerkMiddleware());
app.use(fileUpload(
    {
        useTempFiles:true,
        tempFileDir: path.join(__dirname,"temp"),
        createParentPath:true,
        limits:{
            fileSize:10*1024*1024,
        }
    }
));

const tempDir=path.join(process.cwd(),"tmp")
crons.schedule("0 * * * *",()=>{
if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
    }
})

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/albums",albumsRoutes);
app.use("/api/songs",songsRoutes);
app.use("/api/stats",statsRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend","dist","index.html"));
    });
}


app.use((err,req,res,next)=>{
    res.status(500).json({message:process.env.NODE_ENV==="production"?"Internal server error":err.message})
})


httpServer.listen(PORT,async ()=>{
    await connectdb();
    console.log(`Server started in port ${PORT}`);
})