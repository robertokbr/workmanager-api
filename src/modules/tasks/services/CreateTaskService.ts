import { getRepository } from 'typeorm';
import Task from '../infra/typeorm/entities/Task';

interface Request {
  taskName: string;
  user_id: string;
  started_at?: Date | string;
}
class CreateTaskService {
  public async execute({
    taskName,
    user_id,
    started_at,
  }: Request): Promise<Task> {
    const taskRepository = getRepository(Task);
    if (!started_at) {
      started_at = Date();
    }
    const task = taskRepository.create({
      name: taskName,
      userId: user_id,
      started_at,
      status: 'Andamento',
    });
    await taskRepository.save(task);
    return task;
  }
}

export default CreateTaskService;
