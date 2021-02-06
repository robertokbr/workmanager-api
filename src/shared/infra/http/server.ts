import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import '../typeorm';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());

app.use(express.json());

app.use(routes);

app.get('/', async (_, response) => {
  return response.json({ connected: true });
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
