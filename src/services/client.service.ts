import { Connection, EntityRepository, Repository, getConnection } from 'typeorm';
import { ClientEntity } from '@entities/client.entity';
import { Client } from '@interfaces/client.interface';
import { HttpException } from '@exceptions/HttpException';
import { AuthService } from './auth.service';

const generateUserId = async () => {
  const count = await getConnection().getRepository(ClientEntity).count();

  //generate user id
  const userId = 'cli-' + (count + 1).toString().padStart(4, '0');
  return userId;
};



@EntityRepository(ClientEntity)
export class ClientService extends Repository<ClientEntity> {
  public async findAllClients(): Promise<Client[]> {
    try {
        const allClients =  await getConnection().query('SELECT * FROM client_entity');
        return allClients;
      }   
     catch (error) {
        throw error;
    }}


  public async findClientById(clientId: number): Promise<Client | undefined> {
    try {
    const clientById = await getConnection().query(
     'SELECT * FROM client_entity WHERE client_id = $1', 
        [clientId]);
    const result = clientById.length ? clientById[0] : undefined;
     return result;  
    } catch (error) {
        throw error;
    }
  }

  async createClient(clientData: Partial<Client>): Promise<Client> {
    try {
      const findClient: Client = await ClientEntity.findOne({ where: { email: clientData.email } });
      if (findClient) throw new HttpException(409, `Client with ${clientData.email} already exist`);
  
      // generate user ID
      const userId = await generateUserId();

        const connection = getConnection();
        const query = `
          INSERT INTO client_entity(userid, first_name, last_name, email, phone_number, mobile_number, address, state, activation_code)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING *
        `;
        const result = await connection.query(query, [
          userId,
          clientData.first_name,
          clientData.last_name,
          clientData.email,
          clientData.phone_number,
          clientData.mobile_number,
          clientData.address,
          clientData.state,
          clientData.activation_code,
        ]);

        await new AuthService().createUser(userId, clientData);
        return result[0]; 
    } catch (error) {
        throw error;
    }
  }


  public async updateClient(clientId:number,clientData: Partial<Client>): Promise<Client> {
    const findClient: Client = await ClientEntity.findOne({ where: { client_id: clientId } });
    if (!findClient) throw new HttpException(409, "User doesn't exist");

    await ClientEntity.update(clientId, { ...clientData });

    const updateClient: Client = await ClientEntity.findOne({ where: { client_id: clientId } });
    return updateClient;
  }

 
  public async deleteClient(clientId: number): Promise<void> {
    const findClient: Client = await ClientEntity.findOne({ where: { client_id: clientId } });
    if (!findClient) throw new HttpException(409, "User doesn't exist");
    
    await getConnection().query(
      'DELETE FROM client_entity WHERE client_id = $1',[clientId]
    );
}

}
