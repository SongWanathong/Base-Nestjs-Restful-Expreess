import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Bank } from 'src/bank/entities/bank.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Bank, User],
    synchronize: false,
    timezone: 'Asia/Bangkok',
    extra: {
      charset: 'utf8mb4',
    },
    logging: ['query', 'error'],
  }),
);
