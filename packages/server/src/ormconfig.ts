import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    synchronize: true,
    logging: true,
    entities: [],
});
