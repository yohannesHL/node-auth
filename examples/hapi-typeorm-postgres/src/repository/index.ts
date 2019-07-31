import { getConnection } from 'typeorm';
import User from '../entity/User';

const dbConn = getConnection();
export const userRepository = dbConn.getRepository(User);
