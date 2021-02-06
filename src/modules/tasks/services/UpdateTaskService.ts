import { getRepository } from 'typeorm';
import Task from '@modules/tasks/infra/typeorm/entities/Task';

interface Request {
  task_id: string;
  finished_at: Date;
  cancellationReason?: string;
}

class UpdateTaskService {
  public async execute({
    task_id,
    finished_at,
    cancellationReason,
  }: Request): Promise<Task> {
    const taskRepository = getRepository(Task);
    const task = await taskRepository.findOne({ where: { id: task_id } });
    if (!task) {
      throw new Error('Reload your application to update task');
    }

    task.finished_at = finished_at || Date();
    task.status = 'Finalizada';
    if (cancellationReason) {
      task.cancellationReason = cancellationReason;
      task.status = 'Cancelada';
    }
    await taskRepository.save(task);
    return task;
  }
}

export default UpdateTaskService;
