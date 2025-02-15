import cloudinary from "../lib/cloudinary.js";
import {Song} from "../models/song.model.js";
import {Album} from "../models/album.model.js";


const uploadToCloudinary = async (file) => {
    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type:'auto',
        }); 
        return result.secure_url;
    }catch(err){
        console.log("Error in uploadToCloudinary",err);
        throw new Error("Error in uploadToCloudinary"); 
    }
}
export const createSong = async (req, res,next) => {

    try{
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message:'Please provide audio and image files'});
        }
    
        const {title,artist,albumId,duration} = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;
    
        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);
    
        const song = await Song.create({
            title,
            artist,
            albumId: albumId || null,
            duration,
            audioUrl,
            imageUrl
        });
    
        await song.save();
    
        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push:{songs:song._id}
            })
        }
        res.status(201).json({message:'Song created successfully',song});
        
    }catch(err){
        console.log(err);
        //res.status(500).json({message:'Internal server error',err});
        next(err);
    }
}

export const deleteSong = async (req,res,next)=>{
    try{
        const {id } = req.params;
        const song = await Song.findById(id);

        if(song.albumId){
            const album = await Album.findByIdAndUpdate(song.albumId,{
                $pull:{songs:song._id}
            });
        }
        await Song.findByIdAndDelete(id);
        res.status(200).json({message:'Song deleted successfully'});
    }catch(err){
        console.log(err);
        next(err);
    }
}

export const createAlbum = async (req,res,next)=>{
    try{
        const {title,artist, releaseYear} = req.body;
        const {imageFile} = req.files;

        const imageUrl = await uploadToCloudinary(imageFile);
        const album = await Album.create({
            title,
            artist,
            releaseYear,
            imageUrl
        });
        await album.save();
    }catch(err){
        console.log(err);
        next(err);
    }
}

export const deleteAlbum = async (req,res,next)=>{
    try{
        const {id} = req.params;
        await Song.deleteMany({albumId:id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message:'Album deleted successfully'});
    }catch(err){
        console.log(err);
        next(err);
    }
}

export const checkAdmin = (req,res)=>{
    res.status(200).json({admin:true});
}