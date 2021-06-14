import { IPhoto } from '../../entities/Photo';



export interface IPhotoDao {
    getAll: () => Promise<IPhoto[]>;
    add: (photo: IPhoto) => Promise<IPhoto>;
}
