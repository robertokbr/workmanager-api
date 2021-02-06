import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateTeamService from '../services/CreateTeamService';
import Team from '../models/Team';

const teamRouter = Router();
teamRouter.use(ensureAuthenticated);

teamRouter.post('/', async (request, response) => {
  const { manager_id, users_id } = request.body;
  const creaetTeam = new CreateTeamService();
  const team = await creaetTeam.execute({ manager_id, users_id });
  return response.json(team);
});

teamRouter.get('/:manager_id', async (request, response) => {
  const { manager_id } = request.params;

  const teamRepository = getRepository(Team);
  const team = await teamRepository.find({ where: { manager_id } });
  const users = team.map(teamUser => {
    delete teamUser.user.password;
    return teamUser.user;
  });

  return response.json({ members: users });
});

export default teamRouter;
