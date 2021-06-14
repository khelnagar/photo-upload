import jsonfile from 'jsonfile';
import { IPhoto } from '../../entities/Photo';


interface IDatabase {
    photos: IPhoto[];
}


class MockDao {

    private readonly dbFilePath = 'src/daos/MockDb/MockDb.json';


    protected openDb(): Promise<IDatabase> {
        return jsonfile.readFile(this.dbFilePath) as Promise<IDatabase>;
    }


    protected saveDb(db: IDatabase): Promise<void> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}

export default MockDao;
