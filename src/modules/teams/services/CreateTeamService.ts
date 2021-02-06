import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Team from '@modules/teams/infra/typeorm/entities/Team';

interface Request {
  manager_id: string;
  users_id: string[];
}

class CreateTeamService {
  public async execute({ manager_id, users_id }: Request): Promise<Team[]> {
    const userRepository = getRepository(User);
    const teamRepository = getRepository(Team);

    const checkIfUserIsManager = await userRepository.findOne({
      where: { id: manager_id },
    });

    if (!checkIfUserIsManager || checkIfUserIsManager.isManager === false) {
      throw new Error('User need to be a manager to create a team!');
    }

    const team = users_id.map(user =>
      teamRepository.create({
        user_id: user,
        manager_id,
      }),
    );
    const teamArray = await teamRepository.save(team);
    return teamArray;
  }
}

export default CreateTeamService;
