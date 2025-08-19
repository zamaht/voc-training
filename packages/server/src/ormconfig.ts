import { DataSource } from 'typeorm';
import { getServerEnv } from './core/serverEnv';

export const AppDataSource = new DataSource({
    type: 'postgres',
    synchronize: true,
    host: getServerEnv().postgresDbHost,
    logging: true,
    entities: [],
});
