import {User} from '../models/user.model.js';

export const authCallback = async (req,res)=>{
    try{
        const {id,firstName,lastName,imageUrl} = req.body;
        const user = await User.findOne({clerkId:id});

        if(!user){
            await User.create({
                clerkId:id,
                fullName:`${firstName} ${lastName}`,
                imageUrl
            });
        }
        res.status(200).json({message:'User created successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({message:'Internal server error',err});
    }

}