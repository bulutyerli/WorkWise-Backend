import express from 'express';
import staffRoutes from './routes/staffRoutes';
import userRoutes from './routes/userRoutes';
import { Express, Request, Response, NextFunction } from 'express';
import { ErrorHandler } from './utils/ErrorHandler';
import { globalError } from './middlewares/errors';
import { protect } from './controllers/authController';

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', staffRoutes);
app.use('/app', userRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new ErrorHandler(404, `Can't find ${req.originalUrl} on this server`));
});

app.use(globalError);

export default app;
