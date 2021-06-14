import { v4 as uuidv4 } from 'uuid';


export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export const getUuid = () => {
    return uuidv4();
};
