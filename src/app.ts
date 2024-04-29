import express from 'express';
import cors from 'cors';
import staffRoutes from './routes/staffRoutes';
import financeRoutes from './routes/financeRoutes';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import hierarchyRoutes from './routes/chartRoutes';
import { Express, Request, Response, NextFunction } from 'express';
import { ErrorHandler } from './utils/ErrorHandler';
import { globalError } from './middlewares/errors';

const app: Express = express();

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL
    : 'http://localhost:5173';
const options: cors.CorsOptions = {
  origin: baseUrl,
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/app', userRoutes);
app.use('/api/v1', staffRoutes);
app.use('/api/v1', financeRoutes);
app.use('/api/v1', staffRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', hierarchyRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new ErrorHandler(404, `Can't find ${req.originalUrl} on this server`));
});

app.use(globalError);

export default app;
