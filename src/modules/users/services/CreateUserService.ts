import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  name: string;
  password: string;
  isManager?: boolean;
}

class CreateUserService {
  public async execute({ name, password, isManager }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const userWithSameUserName = usersRepository.findOne({ where: { name } });

    if (userWithSameUserName) {
      throw new Error('Username already in use!');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      password: hashedPassword,
      isManager,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
