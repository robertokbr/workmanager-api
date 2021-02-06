import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('team')
class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  manager_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Team;
