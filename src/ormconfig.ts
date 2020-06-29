import { ConnectionOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import * as fs from 'fs';

const data: any = dotenv.parse(fs.readFileSync(`.env`));

const config: ConnectionOptions = {
    type: 'mariadb',
    host: data.HOST || 'localhost',
    port: parseInt(data.PORT) || 3306,
    username: data.USERNAME,
    password: data.PASSWORD,
    database: data.DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // synchronize: process.env.NODE_ENV !== "production",
    synchronize: true,
    migrationsRun: process.env.NODE_ENV === 'production',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
};

export = config;
