import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { name, password } = request.body;
  const authenticate = new AuthenticateUserService();
  const { user, token } = await authenticate.execute({
    password,
    name,
  });

  //@ts-ignore
  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
