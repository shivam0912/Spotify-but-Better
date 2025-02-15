import { Message } from '../models/message.model.js';
import {User} from '../models/user.model.js';

export const getAllUsers = async (req,res,next)=>{
    try{
        const currentUser = req.auth.userId;
        
        //fetch all users except the current user
        const users = await User.find({clerkId:{$ne:currentUser}});
        res.status(200).json(users);
    }catch(err){
        next(err)
    }
}

export const getMessages = async (req,res,next)=>{
    try{
        const myId = req.auth.userId;
        const {userId} = req.params;

        const messages = await Message.find({
            $or:[
                {senderId:userId,receiverId:myId},
                {senderId:myId,receiverId:userId},
            ],
        }).sort({createdAt:1});

        res.status(200).json(messages);
    }catch(err){
        next(err)
    }
}