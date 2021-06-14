import { IPhoto } from '../../entities/Photo';
import { getRandomInt } from '../../shared/functions';
import { IPhotoDao } from './PhotoDao';
import MockDao from '../MockDb/MockDao';



class PhotoDao extends MockDao implements IPhotoDao {

    public async getAll(): Promise<IPhoto[]> {
        const db = await super.openDb();
        return db.photos;
    }


    public async add(photo: IPhoto): Promise<IPhoto> {
        const db = await super.openDb();
        photo.id = getRandomInt();
        db.photos.push(photo);
        await super.saveDb(db);
        return photo;
    }
}

export default PhotoDao;
