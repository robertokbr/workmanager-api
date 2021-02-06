import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import taskRouter from '@modules/tasks/infra/http/routes/task.routes';
import teamRouter from '@modules/teams/infra/http/routes/team.routes';

const routes = Router();

routes.use('/session', sessionsRouter);
routes.use('/task', taskRouter);
routes.use('/team', teamRouter);
routes.use('/user', usersRouter);

export default routes;
