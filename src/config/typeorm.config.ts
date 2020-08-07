import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { HOSTNAME, USERNAME, PASSWORD, DATABASE } from './config';
import { Client } from 'client/src/share/entities/client.entity';
import { User } from 'client/src/share/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database:'db.sqlite',
  entities: [Client,User],
  synchronize: true,
  logging: false
};
