import { Song} from '../models/song.model.js';
import { User} from '../models/user.model.js';
import { Album} from '../models/album.model.js';


export const getAllStats = async (req,res,next)=>{
    try{
        // const totalSongs = await Song.countDocuments();
        // const totalUsers = await User.countDocuments();
        // const totalAlbums = await Album.countDocuments();

        //this is more optimise way 

        const [totalSongs,totalUsers,totalAlbums,uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),
            Song.aggregate([
                {
                    $unionWith:{
                        coll:"albums",
                        pipeline:[]
                    }
                },
                {
                    $group:{
                        _id:"$artist",
                    }
                },
                {
                    $count:"count"
                }
            ])
        ])
        res.json({totalSongs,totalUsers,totalAlbums,totalArtists:uniqueArtists[0]?.count || 0});
    }catch(err){
        next(err);
    }
}