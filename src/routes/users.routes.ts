import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import User from '../models/User';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, password, isManager } = request.body;
  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    password,
    isManager,
  });
  delete user.password;
  return response.json(user);
});

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const allUsers = (await userRepository.find()).map(user => {
    delete user.password;
    return user;
  });
  return response.json(allUsers);
});

export default usersRouter;
