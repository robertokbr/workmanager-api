import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateTaskService from '../services/CreateTaskService';
import UpdateTaskService from '../services/UpdateTaskService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Task from '../models/Task';

const taskRouter = Router();
taskRouter.use(ensureAuthenticated);

taskRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const taskRepository = getRepository(Task);
  const task = await taskRepository.find({ where: { userId: id } });
  return response.json(task);
});

taskRouter.post('/', async (request, response) => {
  const { taskName, started_at } = request.body;
  const { id } = request.user;
  const createTask = new CreateTaskService();
  const task = await createTask.execute({ taskName, user_id: id, started_at });
  return response.json(task);
});

taskRouter.put('/', async (request, response) => {
  const { task_id, cancellationReason, finished_at } = request.body;
  const updateTask = new UpdateTaskService();
  const newTask = await updateTask.execute({
    task_id,
    cancellationReason,
    finished_at,
  });
  return response.json(newTask);
});

export default taskRouter;
