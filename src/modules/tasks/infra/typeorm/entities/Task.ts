import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('task')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  status: 'Andamento' | 'Finalizada' | 'Cancelada';

  @Column()
  userId: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('timestamp')
  started_at: Date;

  @Column('timestamp')
  finished_at: Date;

  @Column()
  cancellationReason: string;
}

export default Task;
