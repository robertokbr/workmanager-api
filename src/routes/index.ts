import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import taskRouter from './task.routes';
import teamRouter from './team.routes';

const routes = Router();

routes.use('/session', sessionsRouter);
routes.use('/task', taskRouter);
routes.use('/team', teamRouter);
routes.use('/user', usersRouter);

export default routes;
