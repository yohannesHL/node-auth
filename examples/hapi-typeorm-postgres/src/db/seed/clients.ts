import { Client } from '../entity';
import { Connection } from 'typeorm';
import { clients as clientsData } from './clients_data.json';

export default async function createClients(db: Connection) {
  const clientRepository = db.getRepository(Client);

  let createdData;
  for (let data of clientsData) {
    createdData = await clientRepository.createAndSave(data);

    console.info('Created client: ', createdData);
  }

  const allClients = await clientRepository.find();
  console.info('CHECKING SEEDED DATA...');
  console.info('All Clients = ', allClients);
}
