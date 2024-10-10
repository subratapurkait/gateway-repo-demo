import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: false,
    ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    CLI: {
      migrationsDir: 'src/migrations',
    },
    MIGRATIONS_RUN: true,
  };
  const redis = {
    type: 'redis', // Enable Redis caching
    options: {
      host: 'localhost',
      port: 6379,
    },
    duration: 30000, // cache duration in milliseconds (e.g., 30 seconds)
  };

  let ormconfig: TypeOrmModuleOptions = {
    name: 'default',
    type: 'postgres',
    database: '../target/db/sqlite-dev-db.sql',
    logging: true,
    synchronize: true,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    cli: commonConf.CLI,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };

  if (process.env.BACKEND_ENV === 'prod') {
    ormconfig = {
      name: 'default',
      type: 'postgres',
      database: 'nhipster',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      logging: false,
      synchronize: commonConf.SYNCRONIZE,
      entities: commonConf.ENTITIES,
      migrations: commonConf.MIGRATIONS,
      cli: commonConf.CLI,
      migrationsRun: commonConf.MIGRATIONS_RUN,
      cache: {
        type: 'redis', // Enable Redis caching
        options: {
          host: 'localhost',
          port: 6379,
        },
        duration: 30000, // cache duration in milliseconds (e.g., 30 seconds)
      },
    };
  }

  if (process.env.BACKEND_ENV === 'test') {
    ormconfig = {
      name: 'default',
      type: 'sqlite',
      database: ':memory:',
      keepConnectionAlive: true,
      logging: true,
      synchronize: true,
      entities: commonConf.ENTITIES,
      migrations: commonConf.MIGRATIONS,
      cli: commonConf.CLI,
      migrationsRun: commonConf.MIGRATIONS_RUN,
    };
  }

  if (process.env.BACKEND_ENV === 'dev') {
    ormconfig = {
      name: 'default',
      type: 'postgres',
      database: 'nhipster',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      logging: false,
      synchronize: commonConf.SYNCRONIZE,
      entities: commonConf.ENTITIES,
      migrations: commonConf.MIGRATIONS,
      cli: commonConf.CLI,
      migrationsRun: commonConf.MIGRATIONS_RUN,
      cache: {
        type: 'redis', // Enable Redis caching
        options: {
          host: 'localhost',
          port: 6379,
        },
        duration: 30000, // cache duration in milliseconds (e.g., 30 seconds)
      },
    };
  }

  return ormconfig;
}

export { ormConfig };
