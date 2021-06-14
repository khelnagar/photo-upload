import fs from 'fs';

import { getUuid } from '../shared/functions';
import { IPhoto } from '../entities/Photo';
import { errorNotPhoto } from '../shared/constants';

const { pipeline } = require('stream/promises');

const multer = require('multer');


// deprecated
/**
 * Upload photo.
 * 
 * @param path 
 * @returns 
 */
export async function uploadPhoto(tmpPath: string, orgPath: string): Promise<IPhoto> {

    // generate new path with uuid 
    var fileExt = orgPath.split('.').slice(-1)[0];

    var newPath = getUuid() + '.' + fileExt;

    var targetPath = 'src/public/uploads/' + newPath;

    var src = fs.createReadStream(tmpPath);
    var dest = fs.createWriteStream(targetPath);

    await pipeline(src, dest);
    
    // Pipeline succeeded

    // delete temp_path file
    fs.unlink(tmpPath, () => console.log('Successfully removed temp upload'));
    
    return {path: newPath};
};

// deprecated
export function isPhoto(orgPath: string): boolean {
    var fileExt = orgPath.split('.').slice(-1)[0];
    return ['jpg', 'png', 'bmp', 'jpeg'].includes(fileExt.toLowerCase());
}

// create multipart parser
const storage = multer.diskStorage({
  destination(req: any, file: any, callback: any) {
    callback(null, 'src/public/uploads');
  },
  filename(req: any, file: any, callback: any) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

const fileFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error(errorNotPhoto));
    }
    callback(null, true);
};

export const uploadConfig = multer({ storage, fileFilter }).single('photo');
