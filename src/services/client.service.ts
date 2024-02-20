import { Connection, EntityRepository, Repository, getConnection } from 'typeorm';
import { ClientEntity } from '@entities/client.entity';
import { Client } from '@interfaces/client.interface';
import { HttpException } from '@exceptions/HttpException';

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
        const connection = getConnection();
        const query = `
          INSERT INTO client_entity(userid, first_name, last_name, email, phone_number, mobile_number, address, state, activation_code)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING *
        `;
        const result = await connection.query(query, [
          clientData.userid,
          clientData.first_name,
          clientData.last_name,
          clientData.email,
          clientData.phone_number,
          clientData.mobile_number,
          clientData.address,
          clientData.state,
          clientData.activation_code,
        ]);
        return result[0]; 
    } catch (error) {
        throw error;
    }
  }

//   public async updateClient(clientId: number, clientData: Partial<Client>): Promise<Client | undefined> {
//     const connection = getConnection();
//     const query = `
//       UPDATE client_entity
//       SET userid = $1, first_name = $2, last_name = $3, email = $4, phone_number = $5, mobile_number = $6, address = $7, state = $8, activation_code = $9
//       WHERE client_id = $10
//       RETURNING *
//     `;
//     const result = await connection.query(query, [
//       clientData.userid,
//       clientData.first_name,
//       clientData.last_name,
//       clientData.email,
//       clientData.phone_number,
//       clientData.mobile_number,
//       clientData.address,
//       clientData.state,
//       clientData.activation_code,
//       clientId,
//     ]);
//     return result.length ? result[0] : undefined;
//   }



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
