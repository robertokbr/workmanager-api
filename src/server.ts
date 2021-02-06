import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import './database';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.get('/', async (request, response) => {
  return response.json({ taFuncionando: 'sim' });
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`server started on port 3333 at `);
});
