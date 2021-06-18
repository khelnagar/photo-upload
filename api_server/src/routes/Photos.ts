import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import PhotoDao from '../daos/Photo/PhotoDaoImpl';
import { uploadPhoto, isPhoto } from '../services/Photos';
import { paramMissingError } from '../shared/constants';

const photoDao = new PhotoDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;



/**
 * Get all photos.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function getAllPhotos(req: Request, res: Response) {
    const photos = await photoDao.getAll();
    return res.status(OK).json({photos});
}


/**
 * Add one photo.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function addPhoto(req: Request, res: Response) {

    if (!req.file) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    const photoNewPath = {path: req.file.filename};
    
    // save photo path to db and get id
    const photo =  await photoDao.add(photoNewPath);

    return res.status(CREATED).json({photo});
}