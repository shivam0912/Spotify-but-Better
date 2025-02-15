import express from 'express'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { initializeSocket } from './lib/socket.js'

import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import { connectDB } from './lib/db.js'
import fileUpload from 'express-fileupload'
import path from 'path'
import cron from "node-cron"
import fs from "fs"
import userRoutes from './routes/users.route.js'
import adminRoutes from './routes/admin.route.js'
import authRoutes from './routes/auth.route.js'
import songsRoutes from './routes/songs.route.js'
import statsRoutes from './routes/stats.route.js'
import albumRoutes from './routes/album.route.js'


dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));

const httpServer = createServer(app);
initializeSocket(httpServer);


app.use(express.json());
app.use(clerkMiddleware());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,'temp'),
    createParentPath:true,
    limits: { fileSize: 10 * 1024 * 1024 },
}));

// cron jobs
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
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
});

//routes
app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/songs',songsRoutes)
app.use("/api/albums", albumRoutes);
app.use('/api/stats',statsRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend","dist","index.html"))
    })
}

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({message:process.env.NODE_ENV=="production"?"Internal server error":err.message})
})

const PORT = process.env.PORT;
httpServer.listen(PORT, ()=>{
    connectDB();
    console.log("running on port 5000");
})