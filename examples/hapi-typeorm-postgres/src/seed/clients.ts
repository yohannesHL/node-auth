import { Client } from '../entity';
import { Connection } from 'typeorm';

export default async function createClients(db: Connection) {
  const clientRepository = db.getRepository(Client);
  const clientsData = [];

  let createdData;
  for (let data of clientsData) {
    createdData = await clientRepository.createAndSave(data);

    console.info('Created client: ', createdData);
  }

  const allClients = await clientRepository.find();
  console.info('CHECKING SEEDED DATA...');
  console.info('All Clients = ', allClients);
}
