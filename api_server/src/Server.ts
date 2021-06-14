import path from 'path';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';

const app = express();
const { BAD_REQUEST } = StatusCodes;



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Add APIs
app.use('/api', BaseRouter);
app.use('/assets', (req: Request, res: Response, next: NextFunction ) => {
	console.log(req.url);
	next();
});

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});


/************************************************************************************
 *                              Serve static content
 ***********************************************************************************/

const staticDir = path.join(__dirname, 'public');
app.use('/assets', express.static(staticDir));

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
app.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

// Export express instance
export default app;
