import {Router} from "express";
import { getAllAlbums, getAllAlbumsById } from "../controllers/album.controller.js";

const router = Router();

router.get('/',getAllAlbums);
router.get('/:albumId',getAllAlbumsById);

export default router;