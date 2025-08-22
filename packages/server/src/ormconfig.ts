import { DataSource } from 'typeorm';
import { postgresUrl } from './core/serverEnv';
import { UserSchema } from './core/schema/user';

export const AppDataSource = new DataSource({
    type: 'postgres',
    synchronize: true,
    url: postgresUrl(),
    logging: true,
    entities: [UserSchema],
});
