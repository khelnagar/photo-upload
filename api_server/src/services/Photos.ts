import fs from 'fs';

import { getUuid } from '../shared/functions';
import { IPhoto } from '../entities/Photo';
import { errorNotPhoto } from '../shared/constants';

const { pipeline } = require('stream/promises');

const multer = require('multer');


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
