import { ClientFlatEntity } from '@/entities/client_flat.entity';
import { EntityRepository, Repository, getConnection } from 'typeorm';
import { ClientFlat } from '@/interfaces/client_flat.interface';
import { HttpException } from '@/exceptions/HttpException';

@EntityRepository(ClientFlatEntity)
export class ClientFlatService extends Repository<ClientFlatEntity> {
  public async createClientFlat(clientFlatData: Partial<ClientFlat>): Promise<ClientFlat> {
    const query = `INSERT INTO public.client_flat_entity(
            client_id, project_id, project_code, flat_code)
            VALUES ($1, $2, $3, $4) RETURNING *`;

    const createClientFlatData: ClientFlat = await getConnection().query(query, [
      clientFlatData.client_id,
      clientFlatData.project_id,
      clientFlatData.project_code,
      clientFlatData.flat_code,
    ]);

    return createClientFlatData[0];
  }

  public async findAllClientFlats(): Promise<ClientFlat[]> {
    return await getConnection().query('SELECT * FROM public.client_flat_entity');
  }

  public async findClientFlatsByClientId(clientId: string): Promise<ClientFlat[]> {
    return await getConnection().query('SELECT * FROM public.client_flat_entity WHERE client_id = $1', [clientId]);
  }

  public async findClientFlatsById(id: number): Promise<ClientFlat> {
    const clientFlat = await getConnection().query('SELECT * FROM public.client_flat_entity WHERE id = $1', [id]);
    if (clientFlat.length === 0) throw new HttpException(404, 'Client flat not found');
    return clientFlat[0];
  }

  public async updateClientFlat(id: number, clientFlatData: Partial<ClientFlat>): Promise<ClientFlat> {
    const findClientFlat: ClientFlat = await ClientFlatEntity.findOne({ where: { id: id } });
    if (!findClientFlat) throw new HttpException(404, "Client flat doesn't exist");

    await ClientFlatEntity.update({ id: id }, { ...clientFlatData });
    const updateClientFlat = await ClientFlatEntity.findOne({ where: { id: id } });
    return updateClientFlat;
  }

  public async deleteClientFlat(id: number): Promise<ClientFlat> {
    const deletedClientFlat: ClientFlat[] = await getConnection().query('DELETE FROM public.client_flat_entity WHERE id = $1 RETURNING *', [id]);
    if (!deletedClientFlat.length) throw new HttpException(404, "Client flat doesn't exist");
    return deletedClientFlat[0];
  }
}
