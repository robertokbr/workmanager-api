import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';

interface Request {
  name: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ password, name }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { name },
    });

    if (!user) {
      throw new Error('incorrect name');
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('incorrect password');
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}

export default AuthenticateUserService;
