import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import * as bodyParser from 'body-parser';
import registerRoutes from './services/index';


createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(express.static(__dirname + '/public'))
    
    registerRoutes(app);

    app.listen(7000);

    console.log('Express application is up and running on port 7000');
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
