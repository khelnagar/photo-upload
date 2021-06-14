import { Router } from 'express';
import { getAllPhotos, addPhoto } from './Photos';
import { uploadConfig } from '../services/Photos';


// photos-route
const photosRouter = Router();
photosRouter.get('/all', getAllPhotos);

photosRouter.post('/add', uploadConfig, addPhoto);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/photos', photosRouter);
export default baseRouter;
