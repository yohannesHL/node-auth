import * as ClientsApi from './clients';

export default {
  routes: [
    ClientsApi.createClient,
    ClientsApi.updateClient,
    ClientsApi.deleteClient,
    ClientsApi.getClient,
    ClientsApi.getClients
  ]
};
