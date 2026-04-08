import express from 'express';
import projectRoutes from './routes/projectRoutes';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import categoryRoutes from './routes/categoryRoutes';

const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors());
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/category', categoryRoutes);


app.use(errorHandler);

export default app;