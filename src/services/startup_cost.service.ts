import { EntityRepository, getConnection, Repository } from 'typeorm';
import { StartupCostEntity } from '../entities/start_up_cost.entity';
import { StartupCost } from '@/interfaces/start_up_cost.interface';
import { HttpException } from '@/exceptions/HttpException';

const generateStartUpCode = async () => {
  const count = await getConnection().getRepository(StartupCostEntity).count();

  //generate startup code
  return `sc-${(count + 1).toString().padStart(4, '0')}`;
};

@EntityRepository(StartupCostEntity)
export class StartUpCostService extends Repository<StartupCostEntity> {
  public async createStartUpCost(startUpCostData: StartupCost): Promise<StartupCost> {
    const start_up_code = await generateStartUpCode();
    const query = `INSERT INTO public.startup_cost_entity(
            startup_code, project_code, startup_desc, startup_type, startup_cost, comment)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const createStartUpCostData: StartupCost[] = await getConnection().query(query, [
      start_up_code,
      startUpCostData.project_code,
      startUpCostData.startup_desc,
      startUpCostData.startup_type,
      startUpCostData.startup_cost,
      startUpCostData.comment,
    ]);

    return createStartUpCostData[0];
  }

  public async findAllStartUpCosts(): Promise<StartupCost[]> {
    return await getConnection().query('SELECT * FROM public.startup_cost_entity');
  }

  public async findStartUpCostById(startUpId: number): Promise<StartupCost> {
    const startUpCosts: StartupCost[] = await getConnection().query('SELECT * FROM public.startup_cost_entity WHERE id = $1', [startUpId]);
    if (!startUpCosts.length) throw new HttpException(409, 'Start up cost not found');

    return startUpCosts[0];
  }

  public async findStartUpCostByProjectCode(projectCode: string): Promise<number> {
    const startUpCost: number = await getConnection().query('SELECT SUM(startup_cost) FROM public.startup_cost_entity WHERE project_code = $1', [
      projectCode,
    ]);
    return startUpCost;
  }

  public async updateStartUpCost(startUpId: number, startUpCostData: StartupCost): Promise<StartupCost> {
    const startUpCost: StartupCost = await StartupCostEntity.findOne({ where: { id: startUpId } });
    if (!startUpCost) throw new HttpException(409, 'Start up cost not found');

    await StartupCostEntity.update({ id: startUpId }, startUpCostData);
    const updatedStartUpCost: StartupCost = await StartupCostEntity.findOne({ where: { id: startUpId } });
    return updatedStartUpCost;
  }

  public async deleteStartUpCost(startUpId: number): Promise<StartupCost> {
    const deleteStartUpCost: StartupCost[] = await getConnection().query('DELETE FROM public.startup_cost_entity WHERE id = $1 RETURNING *', [
      startUpId,
    ]);
    if (!deleteStartUpCost.length) throw new HttpException(409, 'Start up cost not found');

    return deleteStartUpCost[0];
  }
}
