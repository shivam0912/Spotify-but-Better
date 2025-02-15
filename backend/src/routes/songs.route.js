import {Router} from "express";
import { 
    getAllSongs, 
    getFeaturedSongs, 
    getMadeForYouSongs, 
    getTrendingSongs 
} from "../controllers/songs.controller.js";
import {protectRoute,requireAdmin} from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/',protectRoute,requireAdmin,getAllSongs);

// ok for these three routes in real world app, 
// we would need to implement the functionality for these routes using 
// Machine learning algorithms to get the songs that are featured, made for you and trending.
// But for now, we will just return all the songs from the database by simple logics like random.
// We will implement the real functionality in the future.

router.get('/featured',getFeaturedSongs);
router.get('/made-for-you',getMadeForYouSongs);
router.get('/trending',getTrendingSongs);



export default router;